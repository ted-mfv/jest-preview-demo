local name = 'si';

{
  local taskdef = self,

  name:: name,
  env:: error 'Must override "env"',
  role:: error 'Must override "role"',
  image_tag:: error 'Must override "image_tag"',
  ecr_registry_id:: error 'Must override "ecr_registry_id"',
  portMappings:: [],
  suffix:: std.extVar('suffix'),

  family: '%s_%s%s' % [taskdef.name, taskdef.role, taskdef.suffix],
  taskRoleArn: '%(name)s_ecs_task_role' % taskdef,
  executionRoleArn: '%(name)s_ecs_task_execution_role' % taskdef,
  volumes: [],
  placementConstraints: [],
  networkMode: 'awsvpc',
  requiresCompatibilities: ['FARGATE'],
  cpu_: '%(cpu)s' % taskdef,
  memory_: '%(memory)s' % taskdef,
  containerDefinitions: [{
    disableNetworking: false,
    name: '%(name)s_%(role)s' % taskdef,
    image: '%(ecr_registry_id)s.dkr.ecr.ap-northeast-1.amazonaws.com/%(name)s_%(role)s:%(image_tag)s' % taskdef,
    essential: true,
    portMappings: taskdef.portMappings,
    environment: [],
    logConfiguration: {
      logDriver: 'awsfirelens',
      options: {
        Name: 'datadog',
        dd_service: '%(name)s_%(role)s' % taskdef,
        dd_source: '%(name)s_%(role)s' % taskdef,
        dd_tags: 'project:%(name)s_%(role)s,env:%(env)s,suffix:%(suffix)s' % taskdef,
        TLS: 'on',
        provider: 'ecs',
      },
      secretOptions: [
        {
          name: 'apiKey',
          valueFrom: '/%(name)s/DD_API_KEY' % taskdef
        }
      ]
    },
    dockerLabels: {
      'com.datadoghq.tags.env': '%(env)s' % taskdef,
      'com.datadoghq.tags.service': '%(name)s_%(role)s' % taskdef,
      'com.datadoghq.tags.version': '%(image_tag)s' % taskdef,
    },
  },
  {
    name: "log_router",
    image: "906394416424.dkr.ecr.ap-southeast-1.amazonaws.com/aws-for-fluent-bit:latest",
    essential: true,
    firelensConfiguration: {
      type: 'fluentbit',
      options: {
        'enable-ecs-log-metadata': 'true',
      }
    }
  },
  {
    name: 'datadog-agent',
    image: 'datadog/agent:latest',
    essential: true,
    environment: [
      {
        name: 'ECS_FARGATE',
        value: 'true'
      },
      {
        name: 'DD_APM_ENABLED',
        value: 'false'
      },
      {
        name: 'DD_LOGS_ENABLED',
        value: 'true'
      },
      {
        name: 'DD_ENV',
        value: '%(env)s' % taskdef
      },
      {
        name: 'DD_CONTAINER_EXCLUDE',
        value: 'name:datadog-agent name:log_router'
      },
      {
        name: 'DD_CONTAINER_INCLUDE',
        value: 'name:%(name)s_%(role)s' % taskdef
      }
    ],
    secrets: [
      {
        name: 'DD_API_KEY',
        valueFrom: '/%(name)s/DD_API_KEY' % taskdef
      }
    ]
  }],
}

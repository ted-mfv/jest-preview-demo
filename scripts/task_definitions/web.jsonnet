local cpu(env) = {
  production: 512,
  staging: 512,
}[env];

local memory(env) = {
  production: 1024,
  staging: 1024,
}[env];

(import 'base.jsonnet') + {
  local taskdef = self,

  role:: 'web',
  env:: std.extVar('env'),
  image_tag:: std.extVar('image_tag'),
  ecr_registry_id:: std.extVar('ecr_registry_id'),
  portMappings:: [{
    containerPort: 80,
    hostPort: 80,
    protocol: 'tcp',
  }],
  cpu:: cpu(self.env),
  memory:: memory(self.env),
}

// Arquivo de configuração do Styled-Components pra funcionar com Server side Rendering

module.exports={
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
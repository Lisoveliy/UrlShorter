export default {
  root: 'src',
  build: {
    outDir: '../../ASP.Net/wwwroot',
    target: 'ESnext',
    rollupOptions: {
      input:{
        index: './src/index.html',
        "create.html": './src/create.html',
        "edit.html": './src/edit.html'
      }
    }
  },
  server: {
    port: 8080
  },
}
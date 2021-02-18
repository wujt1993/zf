<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 16px;
}
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  font-size: 14px;
  .el-form-item {
    margin-bottom: 1rem;
  }
  .el-dialog__header {
    border-bottom: 1px solid #ccc;
    padding: 12px;
  }
  .el-dialog__footer {
    border-top: 1px solid #ccc;
    padding: 12px;
  }
  .el-dialog__body {
    padding: 20px;
  }
}
</style>

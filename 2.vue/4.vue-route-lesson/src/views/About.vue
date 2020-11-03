<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <router-link to="/about/a">about-a</router-link> |
      <router-link to="/about/b">about-b</router-link>
    </div>
    <router-view/>
  </div>
</template>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <li class="navbar-brand">
        <router-link :to="{ name: 'Index' }">Home</router-link>
      </li>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <router-link :to="{ name: 'Index' }">Home</router-link>
      </li>
      <!--
      <li class="nav-item">
        <router-link :to="{ name: 'Products' }">Products</router-link>
      </li>
      
      <li class="nav-item">
        <router-link :to="{ name: 'CreateProduct' }">Create Product</router-link>
      </li>
      -->
      <li class="nav-item">
        <router-link :to="{ name: 'CreateProductUpload' }">Create Product with upload</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Navbar',

    data(){
        return{

        }
    }
}
</script>

<style scoped>
  li{
    padding: 0px 20px;
  }
  #navbarNav{
    justify-content: flex-end;
  }
</style>
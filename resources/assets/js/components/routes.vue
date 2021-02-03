<template>
  <b-card v-if="items.length" header="Routes" class="mb-2">
    <b-table striped hover :responsive="true" :items="items" :fields="fields"></b-table>
  </b-card>
</template>

<script>
  export default {
    name: "routes",
    props: ['route'],

    data() {
      return {
        items: [],
        fields: [
          {
            key: 'name',
            sortable: true
          },
          {
            key: 'methods',
            sortable: false,
            variant: 'primary'
          },
          {
            key: 'uri',
            sortable: true,
            variant: 'info'
          },
          {
            key: 'controller',
            sortable: false
          }
        ],
      }
    },

    mounted() {
      this.getRoutes();
    },

    methods: {
      getRoutes: function() {
        let self = this
        axios.get(this.route)
          .then(function(response) {
            response.data.forEach(route => {
              self.items.push({
                name: route.action.as,
                methods: route.methods.join(', '),
                uri: route.uri,
                controller: route.action.controller
              });
            })
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }
  }
</script>

<style scoped>

</style>
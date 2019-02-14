<template>
  <div id="app">
  <v-app>
  <v-toolbar class="primary" :dark="dark">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>The Smartphone Era</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    absolute
    dark
    temporary
  >
    <v-list class="pa-1">
      <v-list-tile v-if="mini" @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>


      <v-list-tile v-if="!mini" @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-icon>chevron_left</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider light></v-divider>

      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click="" id="menuItem"
      >
        <v-list-tile-action>
          <router-link :to=item.toLink :title=item.title><v-icon>{{ item.icon }}</v-icon></router-link>
        </v-list-tile-action>

        <v-list-tile-content>
          <router-link :to=item.toLink :title=item.description><v-list-tile-title>{{ item.title }}</v-list-tile-title></router-link>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
    <router-view/>
  </v-app>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      mini: false,
      dark: true,
      items: [
        { title: 'Smartphone penetration', icon: 'show_chart' , toLink: "/dashboard", description: "Smartphone Penetration over the years"},
        { title: 'About', icon: 'question_answer', toLink: "/about", description: "About" }
      ],
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
.v-navigation-drawer a:hover{
  color:white !important;
  text-decoration: none;
}
.mapInfo {
  padding: 6px 8px;
  font: 14px/16px Arial, Helvetica, sans-serif;
  background: red;
  background: rgba(255, 255, 255, 0.8) ;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2) ;
  border-radius: 5px;
}
.mapInfo h4 {
  margin: 0 0 5px;
  color: #777 ;
}
.legend {
  text-align: left;
  line-height: 18px;
  color: #555 ;
}
a {
  text-decoration: none;
}
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}

#menuItem{
	font-size: 18px;
}

@media screen and (max-width: 768px){
  .mapInfo h4{
    font: 10px/12px Arial, Helvetica, sans-serif;
  }
}
</style>

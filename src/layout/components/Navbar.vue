<template>
  <div class="nav">
    <div class="navMenu">
      <el-row type="flex" justify="space-between">
        <el-col :span="3" :offset="0">
          <img :src="VUE_APP_VP_BASE_URL+'/dist/logo.jpg'">
          <!-- <span>CollieDB</span> -->
        </el-col>
        <el-col :span="6" :offset="8">
          <span>Introduction</span>
          <span>Support</span>
          <span>Developer</span>
          
        </el-col>
        <el-col :span="2" :pull="0">
          <span>
            <!-- <i style="font-size:35px" class="el-icon-phone"></i> -->
            <el-button icon="el-icon-phone-outline" style="font-size:22px" circle></el-button>
          </span>
          <!-- <span>My Account</span> -->
        </el-col>
        
      </el-row>
      
    </div>
    <div class="navbar">
      <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
      <!-- <breadcrumb class="breadcrumb-container" /> -->
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>
            <a target="_blank" href="#">
              <el-dropdown-item>Github</el-dropdown-item>
            </a>
            <a target="_blank" href="#">
              <el-dropdown-item>Docs</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    // Breadcrumb,
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    VUE_APP_VP_BASE_URL(){
      return process.env.VUE_APP_VP_BASE_URL
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  background-color: black;
}
.navMenu{
  height: 100px;
  img{
    // padding-top: 5%;
    // width: 80%;
    height: 80px;
    margin-top: 10px;
  }
  span{
    font-size: 25px;
    margin:auto 30px;
    line-height: 100px;
    font-weight: bolder;
    color: #e5e4e4;
  }
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: fixed;
  width: 100%;
  top: 25px;
  z-index: 2;
  // background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  // .hamburger-container {
  //   line-height: 46px;
  //   height: 100%;
  //   float: left;
  //   cursor: pointer;
  //   transition: background .3s;
  //   -webkit-tap-highlight-color:transparent;
  //   color: #ffffff;
  //   &:hover {
  //     // background: rgba(255, 255, 255, 0.025)
  //     background: #ffffff
  //   }
  // }

  // .breadcrumb-container {
  //   float: left;
  // }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        // margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

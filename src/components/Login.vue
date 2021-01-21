<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像区域-->
      <div class="avatar_box">
        <img src="@/assets/img/logo.png" alt="">
      </div>
      <!--登录表单区域-->
      <el-form  ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px"  class="login_form">
        <!--用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!--按钮区域-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    return{
      //登录表单数据绑定对象
      loginForm:{
        username:'admin',
        password:'123456'
      },
      loginFormRules:{
        username:[
          {required:true,message:"请输入用户名",trigger:"blur"},
          {min:3,max:10,message: "长度在3到10个字符之间",trigger: "blur"}
        ],
        password:[
          {required:true,message:"请输入密码",trigger:"blur"},
          {min:6,max:15,message: "长度在3到10个字符之间",trigger: "blur"}
        ],
      }
    }
  },

  methods:{
    //重置表单
    resetLoginForm(){
      //获取表单对象并且使用重置方法
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      //valide对表单进行全局合法校验,接受一个验证结果的参数
      this.$refs.loginFormRef.validate( async (valid)=>{
        if(!valid) return;
        let { data:res } = await this.$http.post('login',this.loginForm)
        if(res.meta.status !== 200 ) return this.$message.error('登录失败');
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        //1.将登录成功的token保存到sessionStorage（会话期间存储机制） localStorage（持久化存储）
        window.sessionStorage.setItem('token',res.data.token);
        //2.跳转到后台主页
        this.$router.push('/home')
      })
    }
  }

}
</script>





<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }

  .btns{
    display: flex;
    justify-content: flex-end;
  }

  .login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

</style>

<script lang="ts" setup="setup">
  import { reactive, ref } from 'vue';
  import { reqUserLogin } from '@/api/user/userApi';
  import { OK_CODE } from '@/app/keys';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  import useUserStore from '@/store/userStore';

  const router = useRouter();
  const userStore = useUserStore();
  const userInfo = reactive({
    username: '',
    password: '',
  });
  const rules = {
    username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
    password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  };
  const formEl = ref<HTMLFormElement | null>(null);
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    formEl.value!.validate().then(async (ok: boolean) => {
      if (!ok) return;
      try {
        const { code, data, msg } = await reqUserLogin(userInfo);
        if (code === OK_CODE) {
          ElMessage.success(msg);
          userStore.login(Object.assign({}, data.info, { token: data.token }));
          router.push({ name: 'Dashboard' });
          return;
        }
        ElMessage.error(msg);
      } catch (e) {
        ElMessage.error(e as string);
      }
    });
  };
</script>

<template>
  <div class="layout">
    <div class="login-container">
      <el-form
        ref="formEl"
        size="small"
        :model="userInfo"
        :rules="rules"
        class="form-login"
        @submit="handleSubmit"
      >
        <ul class="login-nav">
          <li class="login-nav__item active">
            <a href="#">Sign In</a>
          </li>
        </ul>
        <label for="login-input-user" class="login__label">Username</label>
        <el-form-item prop="username">
          <el-input
            id="login-input-user"
            v-model:model-value="userInfo.username"
            class="login__input"
            placeholder="用户名"
          />
        </el-form-item>
        <label for="login-input-password" class="login__label">Password</label>

        <el-form-item prop="password">
          <el-input
            v-model:model-value="userInfo.password"
            placeholder="密码"
            type="password"
            class="login__input"
          />
        </el-form-item>
        <label for="login-sign-up" class="login__label--checkbox">
          <input id="login-sign-up" type="checkbox" class="login__input--checkbox" />
          Keep me Signed in
        </label>
        <el-form-item class="login__submit">
          <el-button class="w-full" type="primary" native-type="submit">Sign in</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .layout {
    height: 100vh;
    background: #0f3854;
    background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-container {
      display: block;
      position: relative;
      padding: 5rem 4rem 0 4rem;
      width: 100%;
      max-width: 525px;
      min-height: 680px;
      background-image: url(@/assets/images/login-background.jpg);
      box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.85);
      border-radius: 50px;
      .form-login {
        position: relative;
        z-index: 1;
        padding-bottom: 4.5rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.25);
        .login-nav {
          position: relative;
          padding: 0;
          margin: 0 0 6em 1rem;
        }

        .login-nav__item {
          list-style: none;
          display: inline-block;
        }

        .login-nav__item a {
          position: relative;
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          text-transform: uppercase;
          font-weight: 500;
          font-size: 1.25rem;
          padding-bottom: 0.5rem;
          transition: 0.2s all ease;
        }

        .login-nav__item.active a,
        .login-nav__item a:hover {
          color: #ffffff;
          transition: 0.15s all ease;
        }

        .login-nav__item a:after {
          content: '';
          display: inline-block;
          height: 10px;
          background-color: rgb(255, 255, 255);
          position: absolute;
          right: 100%;
          bottom: -1px;
          left: 0;
          border-radius: 50%;
          transition: 0.15s all ease;
        }

        .login-nav__item a:hover:after,
        .login-nav__item.active a:after {
          background-color: rgb(17, 97, 237);
          height: 2px;
          right: 0;
          bottom: 2px;
          border-radius: 0;
          transition: 0.2s all ease;
        }
        .login__label {
          display: block;
          padding-left: 1rem;
        }

        .login__label,
        .login__label--checkbox {
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          font-size: 0.75rem;
          margin-bottom: 1rem;
        }

        .login__label--checkbox {
          display: inline-block;
          position: relative;
          padding-left: 1.5rem;
          margin-top: 2rem;
          margin-left: 1rem;
          color: #ffffff;
          font-size: 0.75rem;
          text-transform: inherit;
        }

        .login__input {
          color: white;
          font-size: 1.15rem;
          width: 100%;
          padding: 0.5rem 1rem;
          border: 2px solid transparent;
          outline: none;
          border-radius: 1.5rem;
          background-color: rgba(255, 255, 255, 0.25);
          letter-spacing: 1px;
        }

        .login__input:hover,
        .login__input:focus {
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background-color: transparent;
        }

        .login__input + .login__label {
          margin-top: 1.5rem;
        }

        .login__input--checkbox {
          position: absolute;
          top: 0.1rem;
          left: 0;
          margin: 0;
        }

        .login__submit {
          color: #ffffff;
          font-size: 1rem;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 1rem;
          padding: 0.75rem;
          border-radius: 2rem;
          display: block;
          width: 100%;
          background-color: rgba(17, 97, 237, 0.75);
          border: none;
          cursor: pointer;
        }

        .login__submit:hover {
          background-color: rgba(17, 97, 237, 1);
        }
      }

      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        z-index: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: radial-gradient(
          ellipse at left bottom,
          rgba(22, 24, 47, 1) 0%,
          rgba(38, 20, 72, 0.9) 59%,
          rgba(17, 27, 75, 0.9) 100%
        );
        box-shadow: 0 -20px 150px -20px rgba(0, 0, 0, 0.5);
      }
    }
  }
</style>

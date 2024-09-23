<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import { _ } from "svelte-i18n";
  import { Link, Router, Route, links } from "svelte-routing";
  import "./locale/i18n";

  import SignUpPage from './pages/SignUpPage.svelte';
  import LanguageSelector from './lib/components/LanguageSelector.svelte';
  import HomePage from './pages/HomePage.svelte';
  import LoginPage from './pages/LoginPage.svelte';
  import UserPage from './pages/UserPage.svelte';
  import AccountActivationPage from './pages/AccountActivationPage.svelte';

  let path = window.location.pathname;
  
</script>

<Router>
  <div class="bg-light">
    <nav class="container navbar navbar-expand navbar-light">
      <div class="container-fluid" use:links>
        <a href="/" title="Home"  class="navbar-brand">
          <img src={viteLogo} alt="Home" width="30" height="24" class="d-inline-block align-text-top" />
          Home
        </a>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a  class="nav-link" href="/signup">{$_("signUp")}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav> 
  </div>
  
  <div class="container">
    <Route path="/">
      <HomePage />
    </Route>

    <Route path="/signup" >
      <SignUpPage />
    </Route>
  
    <Route path="/login" >
      <LoginPage />
    </Route>

    <Route path="/activate/:token" let:params >
      <AccountActivationPage id={params.token} />
    </Route>

    <Route path="/user/:id" let:params >
      <UserPage id={params.id} />
    </Route>
    <!-- <SignUpPage /> -->
    <LanguageSelector />
  </div>
</Router>



<!-- <main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style> -->

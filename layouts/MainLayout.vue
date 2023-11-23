<template>
    <div>
        <div class="container">
        <div class="navbar bg-base-100">
          <div class="flex-1">
            <h2 class="heading2">Who's da Captn?</h2>
          </div>
          <div class="flex-none gap-2">
            <div class="dropdown dropdown-end">
            <button class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
              <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><NuxtLink to="/">Game Center</NuxtLink></li>
                <li><NuxtLink to="/stats">Stats</NuxtLink></li>
              </ul>
            </div>
          </div>
        </div>
        </div>

        <div class="container">
            <!-- Content slot for the main content -->
            <slot />
        </div>

    </div>
</template>

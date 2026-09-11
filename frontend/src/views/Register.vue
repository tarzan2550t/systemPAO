<template>
    <div class="flex h-screen w-full justify-center items-center">
        <div class="bg-white w-80 h-auto p-5 text-black  rounded flex
        flex-col gap-5 jutify-conter items-center shadow-lg">
            <p>Register</p>
            
            <input type="text" placeholder="name" class="input" />
            <input type="email" placeholder="email" class="input" />
            <input type="text" placeholder="Department" class="input" />
            <button class="btn btn-success w-full">Success</button>
            <p class="text-sm">
                You have accout
                <Router-link class="link link-success" :to="{name : 'login'}">login</Router-link>
            </p>
        </div>
    </div>
</template>
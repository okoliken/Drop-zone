<template>
    <div>

        <div class=" py-8 bg-white rounded-lg border border-solid shadow border-grey-lighter">
            <div class=" px-10 flex items-center justify-between ">

                <div>
                    <h1 class=" mb-1 text-xl font-normal "> Hello {{getUserData.fname}} {{getUserData.lname}},
                        Welcome to Optima</h1>
                    <h5 class=" text-sm">Let’s show you around and help you get started with a few things.</h5>
                </div>


                <div class=" pr-16">
                    <div role="button" class=" cursor-pointer" @click="closeStart">
                        <img class="animate-bounceslow" src="../assets/images/optimaAsset/airplane.svg" alt="">
                        <p class=" text-center text-sm">Remind me later</p>
                    </div>
                </div>
            </div>
        </div>


        <div>

            <div class=" flex w-full mt-10">

                <div class=" w-1/2 bg-white rounded shadow p-8 py-10 mr-10">
                    <div class=" flex items-center justify-between">
                        <div>
                            <h1 class=" mb-2 text-xl font-normal"> Setup Organisation's Details </h1>
                            <p class=" font-normal"> Create profile, structure, and functions.</p>

                            <div class=" mt-5">
                                <button @click="routeOrgSetting"
                                    class=" px-10 py-3 cursor-pointer border-none text-xl text-white rounded-lg bg-cloudenly-primary-main">
                                    Get Started</button>
                            </div>
                        </div>


                        <div>
                            <img src="../assets/images/optimaAsset/orgSvg.svg" alt="" srcset="">
                        </div>
                    </div>
                </div>


                <div class=" w-1/2 bg-white rounded shadow p-8 py-10">
                    <div class=" flex items-center justify-between">
                        <div>
                            <h1 class=" mb-2 text-xl font-normal">Add Users and Roles </h1>
                            <p class=" font-normal"> Assign roles and privileges to user within your <br>
                                organisation.</p>

                            <div class=" mt-5">
                                <button @click="routeUserRoles"
                                    class=" px-10 py-3 cursor-pointer border-none text-xl text-white rounded-lg bg-cloudenly-primary-main">
                                    Get Started</button>
                            </div>
                        </div>

                        <div>
                            <img src="../assets/images/optimaAsset/user&roles.svg" alt="" srcset="">
                        </div>
                    </div>
                </div>

            </div>

        </div>



        <div>

            <div class=" flex w-full mt-10">

                <div class=" w-1/2 bg-white rounded shadow p-8 py-10 mr-10">
                    <div class=" flex items-center justify-between">
                        <div>
                            <h1 class=" mb-2 text-xl font-normal"> Setup Outlet </h1>
                            <p class=" font-normal">Create organisational location.</p>

                            <div class=" mt-5">
                                <button @click="routeOutlet"
                                    class=" px-10 py-3 cursor-pointer border-none text-xl text-white rounded-lg bg-cloudenly-primary-main">
                                    Get Started</button>
                            </div>
                        </div>


                        <div>
                            <img src="../assets/images/optimaAsset/outlet.svg" alt="" srcset="">
                        </div>
                    </div>
                </div>


                <div class=" w-1/2 bg-white rounded shadow p-8 py-10">
                    <div class=" flex items-center justify-between">
                        <div>
                            <h1 class=" mb-2 text-xl font-normal"> Setup Document Templates </h1>
                            <p class=" font-normal"> Customise and brand your document.</p>

                            <div class=" mt-5">
                                <button
                                    class=" px-10 py-3 cursor-pointer border-none text-xl text-white rounded-lg bg-cloudenly-primary-main">
                                    Get Started</button>
                            </div>
                        </div>


                        <div>
                            <img src="../assets/images/optimaAsset/template.svg" alt="" srcset="">
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>



</template>


<script>
import {mapGetters} from 'vuex'
export default {

    computed: {
	...mapGetters('auth/auth', ['getUserData', 'getUserOutlets', 'getOutlet']),

    },

    methods: {
        closeStart() {
            this.$router.push({name: "dashboardAnalytics"})
        },

        routeOrgSetting() {
            this.$router.push({name: "organisationAccountProfile"})
        },

         routeUserRoles() {
            this.$router.push({name: "userSetting"})
        },


        routeOutlet() {
            this.$router.push({name: "outletTaxSetting"})
        },


        routeTemplate() {
            this.$router.push({name: ""})
        },

        routeInventorySetup() {
            this.$router.push({name: "inventorySetting"})
        }


    }
    
}
</script>

<style scoped>

</style>
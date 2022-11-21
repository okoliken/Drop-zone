<template>
    <div class="container bg-white p-5 rounded shadow">

        <div class="mx-10">

            <div>
                <h1 class=" text-black text-2xl"> Upload Supplier</h1>
            </div>


            <div class=" mt-5 mb-8 py-5 pl-5 border border-solid rounded-lg border-b-4 border-grey-light">
                <div class=" flex items-center ">
                <div>
                    <p>Import your supplier information into your business </p>
                </div>
                <div class="pl-16 mr-10">
                    <input @change="selectFile" type="file" name="" id="">
                    <!-- <div class="upload-btn-wrapper cursor-pointer">
                        <button class="btn2 rounded-full px-10">select File </button>
                        <input class="cursor-pointer" type="file" name="myfile" />
                    </div> -->
                </div>


                <div class="">
                    <button @click="uploadContact" class=" mr-5 py-2 px-5  rounded-full bg-cloudenly-primary-main border border-solid 
                        cursor-pointer text-white
                        hover:text-white ">Upload file</button>

                    <button @click="routeCancel" class="py-2 px-5  mr-5 rounded-full bg-transparent border border-solid 
                        cursor-pointer hover:border-cloudenly-primary-main
                        hover:text-cloudenly-primary-main">Cancel</button>
                 </div>

                </div>
            </div>


            <div>
                <h2 class="mb-0"> Supplier CSV template file</h2>
                <p> <span class=" text-cloudenly-primary-main hover:underline font-bold cursor-pointer ">Download and
                        view our supplier CSV template</span>. You can use this as a template for creating your CSV file.
                </p>
            </div>


            

        </div>
    </div>
</template>



<script>
export default {

    name: "ImportContat",

    data() {
        return {
            file: null
        }
    },
    methods: {
      routeCancel() {
          this.$router.push({name: "Suppliermanagement"})       
      },

      selectFile(e) {
        let file = e.target.files[0]
        let reader = new FileReader
        reader.readAsDataURL(file)
        reader.onload = (e) => {
            this.file = e.target.result
            // console.log(this.file)
        }
        // reader.readAsDataURL(file)
        // console.log(file)
      },

      uploadContact() {
        let payload = {
            file: this.file
        }
        this.$store.dispatch('crm/contact/importSupplier', payload).then(resp => {
         console.log(resp.data);
          this.$router.push({name: "Suppliermanagement"})       
        }).catch(err => {
           console.log(err);
           
        })
        
      }
    }
}
</script>




<style scoped>
.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn2 {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
}

.upload-btn-wrapper input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
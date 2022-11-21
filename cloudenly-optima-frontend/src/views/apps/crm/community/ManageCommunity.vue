<template>
  <div class="mt-5">
    <!-- Set Loyalty  -->
    <vs-popup
      button-close-hidden
      title="Add to Loyalty Scheme"
      :active.sync="showLoyaltyModal"
    >
      <div v-if="getCrmRegistrationPrivileges.addContactToLoyaltyScheme || getIsAccOwner">
        <form data-vv-scope="form1">
          <div class="px-5">
            <div class="bg-cloudenly-danger-off p-2 py-3 px-5">
              <p class="text-xl">
                You have selected
                <span class="font-semibold">{{ selectedItems.length }}</span>
                customer(s)
              </p>
            </div>

            <div>
              <div
                class="flex items-center mb-3 mt-3"
                :class="{ error: errors.has('form1.loyalty') }"
              >
                <div class="w-1/3 mr-5">
                  <label class="block text-right text-xl" for="inline-full-name"
                    >Select</label
                  >
                </div>
                <div class="w-1/3">
                  <select
                    name="loyalty"
                    v-validate="'required'"
                    v-model="loyaltyId"
                    class="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    <option
                      v-for="(loyalty, index) in allLoyalty"
                      :key="index"
                      :value="loyalty.id"
                    >
                      {{ loyalty.loyaltyCategory }}
                    </option>
                  </select>

                  <div
                    class="error text-cloudenly-danger-main"
                    v-if="errors.has('form1.loyalty')"
                  >
                    {{ errors.first("form1.loyalty") }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center mt-5">
            <button
              @click="loyaltyCustomer('form1')"
              :disabled="loyaltyButton"
              :class="{
                'cursor-not-allowed': isLoyaltyButtonActive,
                'bg-cloudenly-primary-mid': isLoyaltyButtonActive,
              }"
              type="button"
              class="px-5 py-2 mr-5 rounded-lg cursor-pointer bg-cloudenly-primary-main border-0 text-white"
            >
              Save
            </button>
            <button
              @click="showLoyaltyModal = false"
              type="button"
              class="px-5 py-2 cursor-pointer bg-transparent border-0"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div v-else>
        <div>
          <alert-privilege />
        </div>
      </div>
    </vs-popup>
    <!-- End Loyalty Section -->

    <!-- Set Single contact Loyalty -->
    <s-modal :modal="showSingleLoyaltyModal">
      <div class="text-xl mb-10">Add to Loyalty Scheme</div>

      <div v-if="getCrmRegistrationPrivileges.addContactToLoyaltyScheme || getIsAccOwner">
        <form data-vv-scope="form1">
          <div class="" :class="{ error: errors.has('form1.loyalty') }">
            <div class="">
              <label class="font-semibold block mb-2" for="inline-full-name"
                >Select Loyalty</label
              >
            </div>

            <div class="fill">
              <select
                name="loyalty"
                v-validate="'required'"
                v-model="loyaltyId"
                class="w-full border-1 py-2 px-2 rounded-sm border-gray-400"
              >
                <option
                  v-for="(loyalty, index) in allLoyalty"
                  :key="index"
                  :value="loyalty.id"
                >
                  {{ loyalty.loyaltyCategory }}
                </option>
              </select>
              <div
                class="error text-cloudenly-danger-main"
                v-if="errors.has('form1.loyalty')"
              >
                {{ errors.first("form1.loyalty") }}
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center mt-5">
            <button
              @click="setSingleLoyaltyCustomer('form1')"
              :disabled="loyaltyButton"
              :class="{
                'cursor-not-allowed': loyaltyButton,
                'bg-cloudenly-primary-mid': loyaltyButton,
              }"
              type="button"
              class="px-8 py-3 mr-5 text-lg rounded-lg bg-primary-optima-color text-white"
            >
              Save
            </button>
            <button
              @click="closeSingleLoyaltyModal"
              type="button"
              class="px-8 py-3 text-lg cursor-pointer bg-transparent border-0"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div v-else>
        <div>
          <alert-privilege />
        </div>
      </div>
    </s-modal>

    <loyalty-modal
      v-model="loyaltyModal"
      @reset="selectedItems = []"
      :payload="selectedItems"
    />
    <!-- End single Contact Loyalty -->

    <!-- Blacklist group Customer -->
    <s-modal
      :modal="showBlackListModal"
      button-close-hidden
      title=" Blacklist Customer"
      :active.sync="showBlackListModal"
    >
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        v-if="getCrmRegistrationPrivileges.blacklistContact || getIsAccOwner"
      >
        <div class="container p-5 bg-cloudenly-danger-off rounded">
          <p class="font-semibold">
            You have selected
            <span class="">{{ selectedItems.length }} customer(s)</span>
            to be
            <span class="text-cloudenly-danger-main">Blacklisted</span>
          </p>
        </div>

        <div class="flex">
          <s-text
            v-model="suspendReason"
            label="Reason for Blacklisting:"
            class="px-2 py-2"
            placeholder="Enter Reason"
          />
        </div>

        <s-content-seperator class="my-8" />

        <div class="flex items-center flex-row-reverse justify-between w-full mt-5">
          <s-button
            :disabled="blacklistButton"
            :class="{
              'cursor-not-allowed': blacklistButton,
              'bg-cloudenly-primary-mid': blacklistButton,
            }"
            @click="blacklistCustomer"
            type="button"
            class="px-8 py-3 mr-5 bg-primary-optima-color text-white rounded"
          >
            Blacklist
          </s-button>

          <s-button
            @click="cancelBlacklist"
            type="button"
            class="px-8 bg-light-optima-color text-primary-optima-color"
          >
            Cancel
          </s-button>
        </div>
      </div>

      <div v-else>
        <div class="py-10">
          <alert-privilege />
        </div>
      </div>
    </s-modal>
    <!-- End Blacklist group Customer -->

    <!-- Set Single contact Blacklist -->
    <s-modal :modal="showSingleBlackListModal">
      <div
        class="w-full"
        v-if="getCrmRegistrationPrivileges.blacklistContact || getIsAccOwner"
      >
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-black text-lg">Blacklist Customer</h1>
          <div @click="showSingleBlackListModal = false" class="cursor-pointer">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 18.5C4.02944 18.5 0 14.4706 0 9.5C0 4.52944 4.02944 0.5 9 0.5C13.9706 0.5 18 4.52944 18 9.5C18 14.4706 13.9706 18.5 9 18.5ZM8.99999 16.8636C13.0668 16.8636 16.3636 13.5668 16.3636 9.49999C16.3636 5.43317 13.0668 2.13636 8.99999 2.13636C4.93317 2.13636 1.63636 5.43317 1.63636 9.49999C1.63636 13.5668 4.93317 16.8636 8.99999 16.8636ZM6.30583 13.3515L9.00001 10.6573L11.6942 13.3515L12.8513 12.1944L10.1571 9.5002L12.8513 6.80601L11.6942 5.64893L9.00001 8.34311L6.30583 5.64893L5.14874 6.80601L7.84293 9.5002L5.14874 12.1944L6.30583 13.3515Z"
                fill="#F15846"
              />
            </svg>
          </div>
        </div>

        <hr class="text-gray-400 mt-10 mb-10" />
        <div class="mt-10 flex justify-between">
          <s-button
            class="px-5 py-2 text-white border-none cursor-pointer bg-cloudenly-primary-main rounded-full"
            @click="BlacklistSingleCustomer"
          >
            Blacklist
          </s-button>
          <s-button
            class="px-5 py-2 text-white border-none cursor-pointer bg-red-300 rounded-full"
            @click="showSingleBlackListModal = false"
          >
            Close
          </s-button>
        </div>
      </div>
      <div v-else>
        <div class="py-10">
          <alert-privilege />
        </div>
      </div>
    </s-modal>
    <!-- End Single Contact backlist   -->

    <!-- Export Contact -->
    <export-modal
      v-model="exportContactModal"
      @export="exportContact"
      @close="exportContactModal = false"
    />
    <!-- End Export Contact -->

    <!-- Schedule Message -->
    <Drawer v-on:closeDrawer="messageDrawer = false" :visible="messageDrawer" :size="50">
      <div slot="title">
        <p class="font-semibold">New Message</p>
      </div>

      <div slot="body">
        <VuePerfectScrollbar class="scroll-area" :settings="settings">
          <div v-show="notifyModal">
            <div class="">
              <p class="text-primary-optima-color font-semibold">
                Please select medium of messaging
              </p>

              <div class="flex items-center mt-5">
                <vs-checkbox disabled class="mr-10" v-model="showEmail"
                  >Email</vs-checkbox
                >
                <vs-checkbox disabled v-model="showSMS">SMS</vs-checkbox>
              </div>
            </div>
          </div>

          <div class="mt-10" v-show="showEmail">
            <form @submit.prevent>
              <div class="mb-10">
                <label for="">
                  <div class="mb-5">
                    <span class="font-semibold"> To.</span>
                  </div>
                  <input
                    v-model="contactNames"
                    class="py-2 px-2 border w-full"
                    type="email"
                  />
                </label>
              </div>

              <div class="mb-10">
                <label for="">
                  <div class="mb-5">
                    <span class="font-semibold"> Subject.</span>
                  </div>
                  <input
                    v-model="mailSubject"
                    class="py-2 px-2 border w-full"
                    type="text"
                  />
                </label>
              </div>

              <div>
                <label for="">
                  <div class="mb-5">
                    <span class="font-semibold"> Message.</span>
                  </div>
                  <quill-editor
                    class="py-3"
                    v-model="mailMessage"
                    :options="editorOption"
                  ></quill-editor>
                </label>
              </div>
            </form>
          </div>

          <div v-show="showSMS">
            <form @submit.prevent>
              <vs-input
                v-validate="'required|email'"
                name="selectedItems"
                label-placeholder="To"
                v-model="contactNames"
                class="w-full mb-6"
                :danger="!validateForm && selectedItems != ''"
                val-icon-danger="clear"
                :success="validateForm"
                val-icon-success="done"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-textarea
                counter="140"
                :counter-danger.sync="counterDanger"
                name="mailSubject"
                label-placeholder="Message"
                v-model="mailSubject"
                class="w-full mb-6"
              />
            </form>
          </div>
        </VuePerfectScrollbar>
      </div>

      <div class="" slot="footer">
        <div class="flex items-center justify-between px-5">
          <button @click="close">Cancel</button>
          <button
            class="py-3 px-8 rounded-full bg-primary-optima-color text-white"
            @click="sendMessage"
          >
            Send
          </button>
        </div>
      </div>
    </Drawer>
    <!-- End Schedule Message -->

    <!-- Remove Loyalty -->
    <remove-loyalty-modal
      v-model="removeModalLoyalty"
      :payload="contactId"
      v-if="getCrmRegistrationPrivileges.addContactToLoyaltyScheme || getIsAccOwner"
    />
    <!-- End Royalty -->

    <!-- Search and Actions Section  -->
    <!-- options section -->
    <div class="bg-white px-6 py-12 flex items-center justify-between">
      <!-- search input -->
      <s-combo-box v-model="search" :value="search" />

      <div class="flex items-center">
        <div class="mr-10">
          <drop-down v-show="showAction">
            <div slot="title">
              <button class="flex" style="color: #1034a6">
                Bulk Actions
                <feather-icon icon="ChevronDownIcon" svgClasses="w-5 h-5"></feather-icon>
              </button>
            </div>

            <div slot="body">
              <div class="bg-white w-48">
                <ul>
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="loyaltyModal = true"
                  >
                    Add to Loyalty
                  </li>

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="showBlackListModal = true"
                  >
                    Blacklist
                  </li>

                  <!-- <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="toggleMessageDrawer"
                    >
                      Messaging
                    </li> -->

                  <!-- <li
                    @click="scheduleBulkMeeting(selectedItems)"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                  >
                    Schedule Meeting
                  </li> -->
                </ul>
              </div>
            </div>
          </drop-down>
        </div>

        <button
          class="button button--main text-white py-4 px-8 mr-10"
          @click="$router.push({ name: 'BlackList' })"
        >
          Blacklisted
        </button>

        <button
          v-if="getCrmRegistrationPrivileges.exportRegister"
          @click.prevent="exportContactModal = true"
          class="button button--alt flex items-center text-white py-5 px-10"
        >
          Export Contact
        </button>
      </div>
    </div>
    <!-- table section -->

    <div v-if="getCrmRegistrationPrivileges.viewRegister || getIsAccOwner">
      <div id="div-with-loading" class="vs-con-loading__container bg-white">
        <div class="mb-6 overflow-x-auto" v-if="filterItem.length > 0">
          <div v-if="getIsCustomer">
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr class>
                  <th class="py-3 px-6 tracking-wider">
                    <s-checkbox @change="selectAll" v-model="allSelected" />
                  </th>
                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Customer Name
                  </th>

                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Price Reference
                  </th>
                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Customer Type
                  </th>

                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Loyalty Scheme
                  </th>

                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Customer ID
                  </th>
                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Email
                  </th>

                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Phone Number
                  </th>
                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Status
                  </th>
                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Registered By
                  </th>
                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Status
                  </th>

                  <th
                    class="py-3 px-6 tracking-wider whitespace-nowrap text-dark-optima-color"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(network, index) in filterItem"
                  :key="index"
                  class="font-normal cursor-pointer hover:bg-grey-lightest border border-solid rounded border-grey-lighter border-l-0 border-r-0"
                >
                  <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
                    <s-checkbox :value="network" v-model="selectedItems"></s-checkbox>
                  </td>
                  <td
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                    @click="routeViewContact(network)"
                  >
                    {{ network.name }}
                  </td>

                  <td
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                    @click="routeViewContact(network)"
                  >
                    {{ network.contactCategory | capitalize }}
                  </td>

                  <td
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                    @click="routeViewContact(network)"
                  >
                    {{ network.kind | capitalize }}
                  </td>

                  <td
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                    @click="routeViewContact(network)"
                  >
                    {{ network.loyaltyScheme | filterLoyalty }}
                  </td>

                  <td
                    @click="routeViewContact(network)"
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                  >
                    {{ network.code }}
                  </td>
                  <td
                    @click="routeViewContact(network)"
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                  >
                    <span
                      class="cursor-pointer text-cloudenly-primary-main rounded-lg p-1"
                      >{{ network.email }}</span
                    >
                  </td>

                  <td
                    @click="routeViewContact(network)"
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                  >
                    {{ network.phone }}
                  </td>

                  <td
                    @click="routeViewContact(network)"
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                  >
                    {{ network.status }}
                  </td>

                  <td
                    @click="routeViewContact(network)"
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                  >
                    {{ network.registeredBy }}
                  </td>
                  <td
                    @click="routeViewContact(network)"
                    class="px-6 py-3 whitespace-nowrap border border-gray-200"
                  >
                    {{ network.leadStatus }}
                  </td>

                  <td class="px-6 py-3 whitespace-nowrap border border-gray-200">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <div class="text-center cursor-pointer">
                        <feather-icon
                          class="h-6 w-6"
                          icon="MoreHorizontalIcon"
                        ></feather-icon>
                      </div>
                      <vs-dropdown-menu>
                        <ul style="min-width: 18rem">
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click="routeContact(network)"
                          >
                            View
                          </li>
                          <li
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click="routeViewContact(network)"
                          >
                            Edit
                          </li>
                          <!-- <li
                            v-if="
                              getIsAccOwner ||
                              getCrmRegistrationPrivileges.addContactToLoyaltyScheme ||
                              network.loyalty === null
                            "
                            class="
                              flex
                              py-2
                              px-4
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                            @click.prevent="toggleSingleContactModal(network)"
                          >
                            Add to loyalty Scheme
                          </li> -->

                          <li
                            v-if="network.loyaltySchemeId !== null"
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="handleRemoveContactLoyalty(network)"
                          >
                            Remove from loyalty Scheme
                          </li>
                          <li
                            v-else
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleSingleContactModal(network)"
                          >
                            Add to loyalty Scheme
                          </li>
                          <li
                            v-if="
                              getIsAccOwner ||
                              getCrmRegistrationPrivileges.blacklistContact
                            "
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleSingleBackListModal(network)"
                          >
                            Blacklist
                          </li>

                          <!-- <li
                            v-if="
                              getMeetingPrivileges.createNewMeeting ||
                              getIsAccOwner
                            "
                            class="
                              flex
                              py-2
                              px-4
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                            @click="scheduleMeeting(network)"
                          >
                            Schedule a Meeting
                          </li> -->

                          <li
                            v-if="getMeetingPrivileges.createNewMeeting || getIsAccOwner"
                            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="toggleMessageDrawer"
                          >
                            Send a message
                          </li>
                          <!-- <li
                            v-if="
                              getMeetingPrivileges.createNewMeeting ||
                              getIsAccOwner
                            "
                            class="
                              flex
                              py-2
                              px-4
                              cursor-pointer
                              hover:bg-primary hover:text-white
                            "
                            @click="scheduleMeeting(network)"
                          >
                            Schedule a Meeting
                          </li> -->
                        </ul>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="bg-white">
            <table class="table min-w-full">
              <thead class="bg-gray-300">
                <tr class>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    <vs-checkbox></vs-checkbox>
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Customer Name
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Customer ID
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Email</th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Phone</th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Location
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Contact Person
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Registered By
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Status</th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">Actions</th>
                </tr>
              </thead>
            </table>

            <div
              class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
            >
              <div class="p-5">
                <div class="flex justify-center">
                  <div>
                    <svg
                      width="225"
                      height="181"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity=".25" clip-path="url(#prefix__clip0)">
                        <path
                          opacity=".23"
                          d="M111.117 173.564c47.525 0 86.051-38.092 86.051-85.081 0-46.989-38.526-85.08-86.051-85.08s-86.051 38.091-86.051 85.08 38.526 85.081 86.051 85.081z"
                          fill="#9BA0A7"
                        />
                        <path
                          opacity=".46"
                          d="M110.287 181c44.84 0 81.189-2.157 81.189-4.818 0-2.661-36.349-4.818-81.189-4.818-44.839 0-81.188 2.157-81.188 4.818 0 2.661 36.35 4.818 81.188 4.818z"
                          fill="#5E646D"
                        />
                        <path
                          d="M87.354 69.521l-32.797.382a4.92 4.92 0 00-2 .45 4.868 4.868 0 00-1.635 1.223 4.767 4.767 0 00-1.135 3.802l8.937 63.95a4.802 4.802 0 001.648 2.994 4.902 4.902 0 003.24 1.167l101.165-1.172a4.9 4.9 0 003.21-1.242 4.804 4.804 0 001.576-3.031l6.181-55.28a3.184 3.184 0 00-.823-2.512 3.258 3.258 0 00-2.448-1.054l-77.098.897-2.766-7.564a5.906 5.906 0 00-2.209-2.219 5.993 5.993 0 00-3.046-.79z"
                          fill="#5E646D"
                        />
                        <path
                          d="M87.375 71.07l-32.798.376c-.69.009-1.37.162-1.996.45a4.873 4.873 0 00-1.633 1.218 4.772 4.772 0 00-1.146 3.792l7.114 63.97 114.486-1.324 4.358-55.256a3.197 3.197 0 00-.826-2.509 3.257 3.257 0 00-2.445-1.056l-77.099.897-2.771-7.564a5.9 5.9 0 00-2.207-2.208 5.987 5.987 0 00-3.037-.786z"
                          fill="#9BA0A7"
                        />
                        <path
                          d="M51.136 88.896l5.78 52.001 114.485-1.33 4.111-52.118-124.376 1.447z"
                          fill="#9BA0A7"
                        />
                        <path
                          d="M109.609 37.508L51.011 48.623l14.1 72.668 58.598-11.115-14.1-72.668z"
                          fill="#F3F6F9"
                        />
                        <path
                          d="M109.608 37.51l-.897.174-9.282 72.134 15.757 1.981 8.52-1.619-14.098-72.67z"
                          fill="#9BA0A7"
                          opacity=".42"
                        />
                        <path
                          d="M100.072 44.915l-37.432 7.1.618 3.181 37.431-7.1-.617-3.181zM108.383 87.745l-37.431 7.1.617 3.182 37.431-7.1-.617-3.182zM109.626 94.143l-37.431 7.1.617 3.181 37.431-7.1-.617-3.181zM110.868 100.535l-37.431 7.1.617 3.182 37.431-7.1-.617-3.182zM91.64 51.482L72.932 55.03l.308 1.59 18.708-3.548-.308-1.59zM82.323 61.621l-20.706 3.928.309 1.59 20.706-3.927-.309-1.591zM83.237 66.338L62.53 70.265l.309 1.59 20.706-3.927-.308-1.59zM84.155 71.053L63.45 74.981l.308 1.59 20.707-3.927-.309-1.59zM85.068 75.77l-20.706 3.928.309 1.59 20.706-3.927-.309-1.591zM85.981 80.486l-20.706 3.927.309 1.59 20.706-3.927-.309-1.59zM86.899 85.196l-20.706 3.928.308 1.59 20.707-3.927-.309-1.591zM107.316 56.883L86.61 60.81l.309 1.59 20.706-3.927-.309-1.59zM108.224 61.594l-20.707 3.928.309 1.59 20.706-3.927-.308-1.59zM109.142 66.31l-20.706 3.927.308 1.591 20.707-3.928-.309-1.59zM110.055 71.026l-20.706 3.928.309 1.59 20.706-3.927-.309-1.59zM110.974 75.742L90.267 79.67l.309 1.59 20.706-3.927-.308-1.59zM111.887 80.458l-20.706 3.927.308 1.591 20.707-3.927-.309-1.591z"
                          fill="#9BA0A7"
                        />
                        <path
                          d="M170.995 44.234l-59.19-7.444-9.444 73.401 59.189 7.445 9.445-73.401z"
                          fill="#F3F6F9"
                        />
                        <path
                          d="M159.604 48.342l-37.809-4.756-.414 3.214 37.809 4.756.414-3.214zM153.387 92.006l-37.733-4.899-.426 3.207 37.733 4.9.426-3.208zM152.53 98.45l-37.732-4.898-.426 3.206 37.732 4.899.426-3.207zM152.372 104.528l-37.809-4.756-.413 3.213 37.809 4.756.413-3.213zM149.52 51.994l-18.897-2.377-.207 1.607 18.897 2.377.207-1.607zM137.482 58.762l-20.915-2.631-.207 1.606 20.916 2.631.206-1.606zM136.868 63.531l-20.915-2.63-.207 1.606 20.916 2.631.206-1.607zM136.255 68.29l-20.915-2.63-.207 1.607 20.915 2.63.207-1.606zM135.642 73.056l-20.915-2.631-.207 1.606 20.915 2.631.207-1.606zM135.029 77.815l-20.916-2.63-.206 1.606 20.915 2.631.207-1.607zM134.415 82.58L113.5 79.95l-.207 1.606 20.916 2.63.206-1.606zM162.718 61.941l-20.915-2.63-.207 1.606 20.916 2.63.206-1.606zM162.105 66.7l-20.915-2.63-.207 1.607 20.916 2.63.206-1.606zM161.492 71.465l-20.915-2.63-.207 1.606 20.915 2.63.207-1.606zM160.878 76.23l-20.915-2.63-.207 1.606 20.915 2.63.207-1.606zM160.265 80.995l-20.916-2.631-.206 1.606 20.915 2.631.207-1.606zM159.651 85.754l-20.915-2.63-.207 1.606 20.916 2.631.206-1.607z"
                          fill="#9BA0A7"
                        />
                        <path
                          d="M169.645 171.639l-110.437 1.283a5.362 5.362 0 01-3.536-1.275 5.248 5.248 0 01-1.8-3.268L44.12 98.578a5.21 5.21 0 01.168-2.209 5.248 5.248 0 011.071-1.945 5.32 5.32 0 011.785-1.337 5.378 5.378 0 012.184-.494l128.265-1.487a5.377 5.377 0 012.196.442c.692.3 1.312.74 1.818 1.295a5.258 5.258 0 011.118 1.92c.231.712.306 1.463.22 2.205l-8.072 70.016a5.243 5.243 0 01-1.726 3.302 5.359 5.359 0 01-3.502 1.353z"
                          fill="#9BA0A7"
                        />
                        <path
                          d="M169.666 173.192l-110.427 1.283a5.357 5.357 0 01-3.536-1.275 5.248 5.248 0 01-1.8-3.268l-9.767-69.806a5.211 5.211 0 01.168-2.21c.214-.716.58-1.38 1.072-1.945a5.32 5.32 0 011.788-1.338 5.376 5.376 0 012.185-.492l128.265-1.487a5.37 5.37 0 012.195.44c.692.299 1.311.74 1.817 1.294a5.209 5.209 0 011.335 4.123l-8.072 70.016a5.242 5.242 0 01-1.719 3.31 5.348 5.348 0 01-3.504 1.355z"
                          fill="#5E646D"
                        />
                        <path
                          opacity=".34"
                          d="M121.565 125.513c17.194-5.481 26.638-23.706 21.095-40.706-5.544-17-23.976-26.338-41.17-20.857-17.194 5.481-26.638 23.706-21.094 40.706 5.543 17 23.975 26.338 41.169 20.857z"
                          fill="#9BA0A7"
                        />
                        <path
                          d="M156.621 128.893l-13.644-12.168-5.276 5.782 13.644 12.168 5.276-5.782z"
                          fill="#5E646D"
                        />
                        <path
                          d="M152.681 125.379l-5.765-5.14-5.275 5.782 5.764 5.141 5.276-5.783zM148.51 140.759a3.979 3.979 0 01-.294-5.653l9.097-9.968a4.07 4.07 0 012.796-1.315 4.056 4.056 0 012.917 1.025l33.287 29.943-14.722 15.722-33.081-29.754z"
                          fill="#9BA0A7"
                        />
                        <path
                          d="M187.35 175.652l-5.759-5.139 14.722-15.722 5.553 4.95a3.986 3.986 0 011.328 2.764 3.974 3.974 0 01-1.035 2.884l-9.097 9.973a4.066 4.066 0 01-2.795 1.313 4.077 4.077 0 01-2.917-1.023z"
                          fill="#5E646D"
                        />
                        <path
                          d="M157.313 125.138l-4.085 4.472 36.234 32.499 6.851-7.318-33.287-29.943a4.06 4.06 0 00-2.918-1.025 4.08 4.08 0 00-2.795 1.315z"
                          fill="#7B858F"
                        />
                        <path
                          d="M198.09 169.851l4.07-4.462a3.978 3.978 0 001.034-2.884 3.982 3.982 0 00-1.328-2.764l-5.553-4.95-6.851 7.318 8.628 7.742zM70.793 96.8a40.044 40.044 0 008.031 22.025 40.758 40.758 0 0019.054 13.902 41.226 41.226 0 0023.654 1.093 40.875 40.875 0 0020.281-12.085 40.128 40.128 0 0010.074-21.189 39.93 39.93 0 00-3.531-23.151 40.503 40.503 0 00-15.945-17.31 41.152 41.152 0 00-22.984-5.634c-10.803.55-20.942 5.321-28.188 13.263C73.994 75.656 70.236 86.12 70.793 96.8zm73.4-3.733a32.044 32.044 0 01-4.573 18.22 32.578 32.578 0 01-14.04 12.639 33.04 33.04 0 01-18.775 2.796 32.867 32.867 0 01-17.182-7.988 32.273 32.273 0 01-9.799-16.08 31.99 31.99 0 01.888-18.752 32.366 32.366 0 0111.275-15.105 32.939 32.939 0 0117.863-6.365c8.662-.439 17.146 2.543 23.586 8.287 6.44 5.745 10.309 13.783 10.757 22.348z"
                          fill="#9BA0A7"
                        />
                        <path
                          d="M86.056 93c-.736-10.186 11.446-26.993 29.599-24.66"
                          stroke="#9BA0A7"
                          stroke-width="12.35"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                        />
                        <path
                          opacity=".12"
                          d="M129.203 67.525c8.149 24.31-5.383 47.651-25.756 58.571a33.054 33.054 0 0022.46-2.303c6.972-3.379 12.502-9.1 15.599-16.14a32 32 0 001.307-22.288c-2.254-7.347-7.079-13.662-13.61-17.815v-.025z"
                          fill="#5E646D"
                        />
                        <path
                          d="M144.193 93.067a32.476 32.476 0 01-.35 6.702 32.165 32.165 0 01-4.827 12.481 32.555 32.555 0 01-9.513 9.49 32.975 32.975 0 01-12.579 4.885 33.12 33.12 0 01-13.503-.555 55.363 55.363 0 01-10.818 4.386 41.23 41.23 0 0032.796 2.206 40.884 40.884 0 0014.282-8.738 40.334 40.334 0 009.511-13.687 39.938 39.938 0 003.128-16.315 39.957 39.957 0 00-3.787-16.179 40.371 40.371 0 00-10.057-13.299 40.923 40.923 0 00-14.625-8.165 53.21 53.21 0 015.352 11.246 32.451 32.451 0 0110.622 10.977 32.024 32.024 0 014.368 14.565z"
                          fill="#5E646D"
                        />
                        <path
                          d="M76.12 96.5a34.813 34.813 0 006.979 19.145 35.429 35.429 0 0016.56 12.085 35.841 35.841 0 0020.56.954 35.538 35.538 0 0017.631-10.5 34.886 34.886 0 008.761-18.415 34.705 34.705 0 00-3.061-20.125 35.207 35.207 0 00-13.853-15.051 35.777 35.777 0 00-19.976-4.907 35.772 35.772 0 00-13.418 3.348 35.417 35.417 0 00-11.1 8.173 34.968 34.968 0 00-7.087 11.753A34.682 34.682 0 0076.12 96.5zm68.073-3.464a32.051 32.051 0 01-4.571 18.225 32.576 32.576 0 01-14.041 12.642 33.035 33.035 0 01-18.778 2.799 32.863 32.863 0 01-17.187-7.988 32.275 32.275 0 01-9.801-16.082 31.996 31.996 0 01.887-18.756A32.369 32.369 0 0191.98 68.768a32.943 32.943 0 0117.866-6.367c4.29-.219 8.581.4 12.629 1.821a32.778 32.778 0 0110.963 6.462 32.355 32.355 0 017.627 10.118 32.03 32.03 0 013.129 12.234z"
                          fill="#7B858F"
                        />
                      </g>
                      <defs>
                        <clipPath id="prefix__clip0">
                          <path fill="#fff" d="M0 0h225v181H0z" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div class="ml-2 mt-8">
                    <div class="mt-12 text-lg margin">
                      You have no contact on your customer list.. <br />
                      <span
                        @click="addContact"
                        class="text-cloudenly-primary-main cursor-pointer mb-4"
                        >Click here to Add Customer..</span
                      >
                    </div>
                  </div>
                </div>
                <!-- <div class>
                  <h3 class="m-0">
                    You have no contact on your customer list..
                    <span
                      @click="addContact"
                      class="text-cloudenly-primary-main cursor-pointer pl-1"
                      >Click here to Add Customer..</span
                    >
                  </h3>
                  <p class="text-cloudenly-primary-main cursor-pointer">
                    Learn more here...
                  </p>
                </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination section -->
      </div>
    </div>

    <div v-else>
      <div>
        <s-privilege />
      </div>
    </div>

    <div class="mb-6 px-6 mt-6">
      <s-pagination @pagination="pagination($event)" />
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";
import { quillEditor } from "vue-quill-editor";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Drawer from "../../../components/Drawer/drawer";
import alertPrivilege from "../../../components/Alert/AlertPrevilege";
import ExportModal from "../components/exportModal.vue";
import RemoveLoyaltyModal from "../components/removeRoyalty";
import LoyaltyModal from "../components/loyaltyModal.vue";

// import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  components: {
    VuePerfectScrollbar,
    quillEditor,
    Drawer,
    Datepicker,
    "full-calendar": require("vue-fullcalendar"),
    alertPrivilege,
    ExportModal,
    RemoveLoyaltyModal,
    LoyaltyModal,
  },

  data() {
    return {
      search: "",
      loading: false,
      modal: false,

      blacklistButton: false,
      isBlacklistButtonActive: false,

      loyaltyButton: false,
      isLoyaltyButtonActive: false,
      showSingleLoyaltyModal: false,
      loyaltyModal: false,

      exportButton: false,
      exportContactModal: false,
      names: "",
      showBlackAction: true,
      messageDrawer: false,
      showEmail: true,
      showSMS: false,
      notifyModal: true,
      counterDanger: false,
      suspendReason: "",

      showSingleBlackListModal: false,
      singleContactSelected: "",

      settings: {
        maxScrollbarLength: 20,
        wheelSpeed: 0.3,
      },

      selectData: "",
      current: 0,
      userData: "",
      allSelected: false,
      allBlackListSelected: false,
      selectedItems: [],
      blackListMail: [],
      showAction: false,
      mailSubject: "",
      mailMessage: "",
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike", "link", "blockquote", "code-block"],
            [
              {
                header: 1,
              },
              {
                header: 2,
              },
            ],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
            ],
            [
              {
                font: [],
              },
            ],
          ],
        },
        placeholder: "Message",
      },
      showBlackListModal: false,
      singleBlacklistCustomer: false,
      showLoyaltyModal: false,
      loyaltyId: "",
      blacklistDrawer: true,
      backListName: "",
      contactId: "",
      removeModalLoyalty: false,
      // selectedItems: [],
    };
  },

  computed: {
    ...mapGetters("crm/contact", ["allContact", "getBlacklistContact", "getIsCustomer"]),

    filterItem() {
      return this.allContact.filter((items) => {
        return items.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    ...mapGetters("crm/loyalty", ["allLoyalty"]),
    ...mapGetters("auth/roles", [
      "getUserModulesPrivileges",
      "getIsAccOwner",
      "getCrmRegistrationPrivileges",
      "getMeetingPrivileges",
    ]),
    ...mapGetters("userOutlet", ["getIsUserCreated", "getOptimaUsers"]),

    validateForm() {
      return !this.errors.any() && this.selectedItems != "";
    },

    contactNames() {
      let contactNames = this.selectedItems.map((resp) => {
        return resp.email;
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.names = contactNames);
    },
  },

  methods: {
    toggleMessageDrawer() {
      this.messageDrawer = true;
    },
    addContact() {
      this.$router.push({
        name: "CreateContact",
      });
    },

    setSingleLoyaltyCustomer(scope) {
      this.$validator.validateAll(scope).then((resp) => {
        if (resp) {
          this.loyaltyButton = true;
          this.isLoyaltyButtonActive = true;
          let contactId = [this.singleContactSelected];
          let userInfo = this.$store.state.auth.auth.authData;
          let data = {
            userInfo: userInfo,
            payload: {
              contactIds: contactId,
              loyaltySchemeId: this.loyaltyId,
            },
          };
          this.$store
            .dispatch("crm/contact/bulkSetLoyaltyCustomer", data)
            .then((resp) => {
              this.loyaltyButton = false;
              this.isLoyaltyButtonActive = false;
              this.showSingleLoyaltyModal = false;
              this.loyaltyId = "";
              this.singleContactSelected = {};
              (this.loyaltyId = ""),
                this.$vs.notify({
                  title: "Contact",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
            })
            .catch((err) => {
              this.loyaltyButton = false;
              this.isLoyaltyButtonActive = false;
              this.singleContactSelected = {};
              this.showSingleLoyaltyModal = true;
              this.$vs.notify({
                title: "Contact",
                text: err.response.data.message,
                color: "danger",
                position: "top-right",
              });
            });
        }
      });
    },

    closeSingleBackListModal() {
      this.singleContactSelected = "";
      this.showSingleBlackListModal = false;
      this.suspendReason = "";
    },

    toggleSingleBackListModal(val) {
      this.singleContactSelected = val.id;
      this.backListName = val.name;
      this.showSingleBlackListModal = true;
    },

    cancelBlacklist() {
      this.showBlackListModal = false;
      this.selectedItems = [];
      this.suspendReason = "";
    },

    toggleSingleContactModal(val) {
      // this.singleContactSelected = val.id;
      // this.loyaltyId = val.loyaltySchemeId;
      // this.showSingleLoyaltyModal = true;\
      this.loyaltyModal = true;
      this.selectedItems.push(val);
    },

    closeSingleLoyaltyModal() {
      this.singleContactSelected = "";
      this.showSingleLoyaltyModal = false;
    },

    BlacklistSingleCustomer() {
      this.blacklistButton = true;
      let contactId = [this.singleContactSelected];
      let userInfo = this.$store.state.auth.auth.authData;

      let data = {
        userInfo: userInfo,
        payload: {
          contactIds: contactId,
          isSuspended: true,
          suspendReason: this.suspendReason,
        },
      };

      this.$store
        .dispatch("crm/contact/bulkBlacklistCustomer", data)
        .then((resp) => {
          this.singleContactSelected = "";
          this.suspendReason = "";
          this.blacklistButton = false;
          this.showSingleBlackListModal = false;

          this.$vs.notify({
            title: "Contact",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.blacklistButton = false;
          this.singleContactSelected = "";
          this.$vs.notify({
            title: "Contact",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    exportContact() {
      this.exportButton = true;
      this.$store.dispatch("crm/contact/exportContact").then((resp) => {
        if (resp.data) {
          this.exportButton = false;
          this.exportContactModal = false;
        } else {
          this.exportButton = false;
          this.$vs.notify({
            title: "Contact",
            text: "Export error",
            color: "danger",
            position: "top-right",
          });
        }
      });
    },

    close() {
      this.blacklistDrawer = false;
      this.activePromptAddEvent = false;
      this.messageDrawer = false;
      this.selectedItems = [];
      this.mailSubject = "";
      this.mailCC = "";
      this.mailBCC = "";
      this.mailMessage = "";
      this.notifyModal = true;
    },

    sendMessage() {
      this.messageDrawer = true;
      let userAuth = this.$store.state.auth.auth.authData;
      let receivers = this.selectedItems.map((resp) => {
        return {
          contactId: resp.contactIds,
          contactOrgId: resp.contactOrgId,
          name: resp.name,
          address: resp.address,
          email: resp.name,
          contactName: resp.contactPerson,
          phoneNumber: resp.phoneNumber,
        };
      });
      const dataPayload = {
        userInfo: {
          ...userAuth,
        },
        payload: {
          subject: this.mailSubject,
          body: this.mailMessage,
          receivers: receivers,
        },
      };
      this.$store
        .dispatch("crm/message/messageContact", dataPayload)
        .then((resp) => {
          console.log(resp);
          this.$vs.Modal({
            title: "Message",
            text: "Message Sent",
            color: "primary",
            position: "top-right",
          });
          this.selectedItems = [];
          this.messageDrawer = false;
        })
        .catch((err) => {
          console.log(err);
          this.selectedItems = [];
          this.messageDrawer = true;
          this.$vs.notify({
            title: "Message",
            text: "Message Not Sent",
            color: "danger",
            position: "top-right",
          });
        });
    },

    selectAll() {
      this.selectedItems = [];
      if (this.allSelected === true) {
        this.allContact.map((network) => {
          this.selectedItems.push(network);
        });
      }
    },

    routeViewContact(val) {
      this.$router.push({
        name: "ViewContact",
        params: {
          id: val.id,
        },
        query: { type: "edit" },
      });
      // this.$router.push({name: "ViewContact", params: {id : val.myNetwork.id}})
    },
    routeContact(val) {
      this.$router.push({
        name: "ViewContact",
        params: {
          id: val.id,
        },
        query: { type: "view" },
      });
      // this.$router.push({name: "ViewContact", params: {id : val.myNetwork.id}})
    },

    outside: function () {
      this.showAdvance = false;
    },

    loyaltyCustomer(scope) {
      this.$validator.validateAll(scope).then((resp) => {
        if (resp) {
          this.loyaltyButton = true;
          this.isLoyaltyButtonActive = true;

          let contactId = this.selectedItems.map((resp) => {
            return resp.id;
          });
          let userInfo = this.$store.state.auth.auth.authData;
          let data = {
            userInfo: userInfo,
            payload: {
              contactIds: contactId,
              loyaltySchemeId: this.loyaltyId,
            },
          };
          this.$store
            .dispatch("crm/contact/bulkSetLoyaltyCustomer", data)
            .then((resp) => {
              this.loyaltyButton = false;
              this.isLoyaltyButtonActive = false;
              this.showLoyaltyModal = false;
              this.selectedItems = [];
              (this.loyaltyId = ""),
                this.$vs.notify({
                  title: "Contact",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
            })
            .catch((err) => {
              this.loyaltyButton = false;
              this.isLoyaltyButtonActive = false;
              this.selectedItems = [];
              this.showLoyaltyModal = false;
              this.$vs.notify({
                title: "Contact",
                text: err.response.data.message,
                color: "danger",
                position: "top-right",
              });
            });
        }
      });
    },

    blacklistCustomer() {
      this.blacklistButton = true;
      this.isBlacklistButtonActive = true;
      let contactId = this.selectedItems.map((resp) => {
        return resp.id;
      });
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          contactIds: contactId,
          isSuspended: true,
          suspendReason: this.suspendReason,
        },
      };
      this.$store
        .dispatch("crm/contact/bulkBlacklistCustomer", data)
        .then((resp) => {
          console.log(resp.data);
          this.showBlackListModal = false;
          this.selectedItems = [];
          this.$vs.notify({
            title: "Contact",
            text: "Contact(s) blacklisted",
            color: "primary",
            position: "top-right",
          });
          this.blacklistButton = false;
          this.isBlacklistButtonActive = false;
        })
        .catch((err) => {
          console.log(err);
          this.selectedItems = [];
          this.blacklistButton = false;
          this.isBlacklistButtonActive = false;
          this.$vs.notify({
            title: "Contact",
            text: "Suspend Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    scheduleMeeting({ id }) {
      this.$router.push(`/community/meeting/new?type=schedule&id=${id}`);
    },
    scheduleBulkMeeting(param) {
      const people = param.map((item) => item.id);
      this.$router.push(`/community/meeting/new?type=schedule&id=${people}`);
    },

    handleRemoveContactLoyalty(data) {
      console.log(data.id);
      (this.removeModalLoyalty = true), (this.contactId = data.id);
      this.$store.dispatch("crm/contact/getAllContact");
    },

    async pagination(data) {
      await this.$store.dispatch("crm/contact/getAllContact", data);
      // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    },
  },

  watch: {
    selectedItems: function () {
      if (this.selectedItems.length > 0) {
        this.showAction = true;
      } else {
        this.showAction = false;
      }
    },

    blackListMail: function () {
      if (this.blackListMail.length === 0) {
        this.showBlackAction = false;
      } else {
        this.showBlackAction = true;
      }
    },
    showBlackListModal: function (val) {
      console.log(val);
    },
  },

  directives: {
    "click-outside": {
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function (el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },

  mounted() {
    this.$store.dispatch("crm/contact/getBlacklistCustomer");
    this.$store.dispatch("crm/contact/getAllContact");
    this.$store.dispatch("crm/loyalty/getAllLoyalty");
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
  },
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 2px;
  height: 32px;

  &--search {
    background: #eee;
    border-radius: 50px;
    width: 380px;
    height: 40px;

    &::placeholder {
      color: #070707;
    }
  }
}

.margin {
  margin-top: 80px !important;
}
.button {
  border-radius: 50px;

  &--main {
    background: #1034a6;
  }

  &--alt {
    background: #f3f6f9;
    color: #1034a6;
  }
}
</style>

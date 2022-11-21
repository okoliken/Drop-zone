<template>
  <div>
    <div class="ks-page-header">
      <section class="ks-title">
        <h3>Loan Account</h3>
        <div class="btn-group btn-lg float-right">
          <button
            @click="routeCreateDeposit"
            type="button"
            class="btn btn-primary ks-rounded btn-rounded float-right"
          >
            Go to
          </button>
          <button
            type="button"
            class="btn ks-rounded btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="sr-only">Toggle Dropdown</span>
          </button>
          <div class="dropdown-menu">
            <a
              @click.prevent="routeCreateDeposit"
              class="dropdown-item"
              href="#"
              >Deposit
            </a>
            <!-- <a @click.prevent ="routeCreateLoan" class="dropdown-item" href="#">Loan </a> -->
            <a @click.prevent="routeSummary" class="dropdown-item" href="#">
              Summary
            </a>
          </div>
        </div>
      </section>
    </div>
    <br /><br /><br />
    <br /><br />
    <div class="ks-body">
      <div class="container">
        <div class="panel">
          <!--  Send Modal  New Issue -->
          <div
            class="modal fade"
            id="centralModalSm"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title w-100" id="myModalLabel">New Loan</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <h3 aria-hidden="true">&times;</h3>
                  </button>
                </div>

                <div class="modal-body">
                  <div>
                    <div class="row">
                      <div class="col-4">
                        <div>
                          <br />
                          <div
                            class="text-left container"
                            v-show="customerNetworkCard"
                          >
                            <h5>
                              <span>Name</span>: {{ singleReciever.name }}
                            </h5>
                            <br />
                            <h5>
                              <span>Address</span>:{{ singleReciever.address }}
                            </h5>
                            <br />
                            <h5>
                              <span>Email</span>:{{ singleReciever.email }}
                            </h5>
                            <br />
                            <h5>
                              <span>Phone No</span>:{{ singleReciever.phone }}
                            </h5>
                            <br />
                            <button @click="showRecieverModal" class="btn-link">
                              choose a different network
                            </button>
                          </div>

                          <div class="col-2" v-show="networkRecieverTrigerred">
                            <Card style="width: 250px">
                              <input
                                type="search"
                                name=""
                                placeholder=" Search reciever"
                                v-model="search1"
                                class="form-control"
                                id=""
                              />
                              <ul
                                class="list-group list-group-flush"
                                v-for="(
                                  customer, index
                                ) in filterReceiver.slice(0, 3)"
                                :key="index"
                              >
                                <li class="list-group-item">
                                  <a
                                    @click.prevent="addReciever(customer)"
                                    href="#"
                                    >{{ customer.name }}</a
                                  >
                                </li>
                              </ul>
                              <br />
                              <button
                                @click="routeNetwork"
                                type="button"
                                class="btn btn-primary"
                              >
                                Add new Network
                              </button>
                            </Card>
                          </div>
                          <div class="col-2" v-show="showReciever">
                            <Card style="width: 250px">
                              <div class="text-center">
                                <h6>
                                  <span class="fa fa-5x fa-user"></span>
                                </h6>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="trigeredReciever"
                                >
                                  Reciever Details
                                </button>
                              </div>
                            </Card>
                          </div>
                        </div>
                      </div>

                      <div class="col-8 panel-body">
                        <div class="container">
                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                            >
                              Repayment Date</label
                            >
                            <div class="col-sm-8">
                              <DatePicker
                                type="date"
                                v-model="loanData.validityOrRepaymentDate"
                                placeholder="Select date"
                                style="width: 200px"
                              ></DatePicker>
                            </div>
                          </div>

                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                              >Description</label
                            >
                            <div class="col-sm-8">
                              <textarea
                                v-model="loanData.description"
                                class="form-control"
                                placeholder="Enter Description"
                              ></textarea>
                            </div>
                          </div>

                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                              >Currency</label
                            >
                            <div class="col-sm-8">
                              <select
                                v-model="loanData.currency"
                                class="form-control"
                              >
                                <option value="#">Naira</option>
                                <option value="$">Dollar</option>
                                <option value="$">Pound</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                            >
                              loan Amount
                            </label>
                            <div class="col-sm-8">
                              <input
                                type="text"
                                name=""
                                v-model="loanData.depositLoanAmount"
                                class="form-control"
                                id=""
                              />
                            </div>
                          </div>

                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                              >Payment Channel</label
                            >
                            <div class="col-sm-8">
                              <select
                                v-model="loanData.makePayment"
                                class="form-control"
                              >
                                <option value="cash">Cash</option>
                                <option value="debit card">Debit Card</option>
                                <option value="credit card">Credit Card</option>
                                <option value="cheque">Cheque</option>
                                <option value="bank deposit">
                                  Bank Deposit
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="modal-footer center-block flex-center align-center text-center"
                >
                  <button
                    type="button"
                    class="btn text-center btn-secondary btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <div class="btn-group">
                    <button
                      @click="sendLoan"
                      type="button"
                      class="btn btn-success"
                    >
                      <strong>Save and Process</strong>
                    </button>
                    <button
                      type="button"
                      class="btn btn-success dropdown-toggle dropdown-toggle-split"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                      <button
                        type="btn btn-secondary "
                        class="dropdown-item"
                        href="#"
                      >
                        <strong>Print</strong>
                      </button>
                      <button
                        type="btn btn-secondary "
                        class="dropdown-item"
                        href="#"
                      >
                        <strong>Cancel</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--  Modal  New Recieve -->
          <div
            class="modal fade"
            id="depositRecieceModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title w-100" id="myModalLabel">
                    Recieve Loan
                  </h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <h3 aria-hidden="true">&times;</h3>
                  </button>
                </div>

                <div class="modal-body">
                  <div>
                    <div class="row">
                      <div class="col-4">
                        <div>
                          <br />
                          <div
                            class="text-left container"
                            v-show="customerNetworkCard"
                          >
                            <h5>
                              <span>Name</span>: {{ singleReciever.name }}
                            </h5>
                            <br />
                            <h5>
                              <span>Address</span>:{{ singleReciever.address }}
                            </h5>
                            <br />
                            <h5>
                              <span>Email</span>:{{ singleReciever.email }}
                            </h5>
                            <br />
                            <h5>
                              <span>Phone No</span>:{{ singleReciever.phone }}
                            </h5>
                            <br />
                            <button @click="showRecieverModal" class="btn-link">
                              choose a different network
                            </button>
                          </div>

                          <div class="col-2" v-show="networkRecieverTrigerred">
                            <Card style="width: 250px">
                              <input
                                type="search"
                                name=""
                                placeholder=" Search reciever"
                                v-model="search1"
                                class="form-control"
                                id=""
                              />
                              <ul
                                class="list-group list-group-flush"
                                v-for="(
                                  customer, index
                                ) in filterReceiver.slice(0, 3)"
                                :key="index"
                              >
                                <li class="list-group-item">
                                  <a
                                    @click.prevent="addReciever(customer)"
                                    href="#"
                                    >{{ customer.name }}</a
                                  >
                                </li>
                              </ul>
                              <br />
                              <button
                                @click="routeNetwork"
                                type="button"
                                class="btn btn-primary"
                              >
                                Add new Network
                              </button>
                            </Card>
                          </div>
                          <div class="col-2" v-show="showReciever">
                            <Card style="width: 250px">
                              <div class="text-center">
                                <h6>
                                  <span class="fa fa-5x fa-user"></span>
                                </h6>
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="trigeredReciever"
                                >
                                  Issuer Details
                                </button>
                              </div>
                            </Card>
                          </div>
                        </div>
                      </div>

                      <div class="col-8 panel-body">
                        <div class="container">
                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                            >
                              Date</label
                            >
                            <div class="col-sm-8">
                              <DatePicker
                                type="date"
                                v-model="loanData.validityOrRepaymentDate"
                                placeholder="Select date"
                                style="width: 200px"
                              ></DatePicker>
                            </div>
                          </div>

                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                              >Description</label
                            >
                            <div class="col-sm-8">
                              <textarea
                                v-model="loanData.description"
                                class="form-control"
                                placeholder="Enter Description"
                              ></textarea>
                            </div>
                          </div>

                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                              >Currency</label
                            >
                            <div class="col-sm-8">
                              <select
                                v-model="loanData.currency"
                                class="form-control"
                              >
                                <option value="#">Naira</option>
                                <option value="$">Dollar</option>
                                <option value="$">Pound</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                            >
                              Loan Amount
                            </label>
                            <div class="col-sm-8">
                              <input
                                type="text"
                                name=""
                                v-model="loanData.depositLoanAmount"
                                class="form-control"
                                id=""
                              />
                            </div>
                          </div>

                          <div class="form-group row no-gutters">
                            <label
                              for="default-input-rounded"
                              class="text-center col-sm-4 form-control-label"
                              >Payment Channel</label
                            >
                            <div class="col-sm-8">
                              <select
                                v-model="loanData.makePayment"
                                class="form-control"
                              >
                                <option value="cash">Cash</option>
                                <option value="debit card">Debit Card</option>
                                <option value="credit card">Credit Card</option>
                                <option value="cheque">Cheque</option>
                                <option value="bank deposit">
                                  Bank Deposit
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="modal-footer center-block flex-center align-center text-center"
                >
                  <button
                    type="button"
                    class="btn text-center btn-secondary btn-sm"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <div class="btn-group">
                    <button
                      @click="saveLoan"
                      type="button"
                      class="btn btn-success"
                    >
                      <strong>Save and Process</strong>
                    </button>
                    <button
                      type="button"
                      class="btn btn-success dropdown-toggle dropdown-toggle-split"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu">
                      <button
                        type="btn btn-secondary "
                        class="dropdown-item"
                        href="#"
                      >
                        <strong>Print</strong>
                      </button>
                      <button
                        type="btn btn-secondary "
                        class="dropdown-item"
                        href="#"
                      >
                        <strong>Save & Email</strong>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal
            v-model="repayModal"
            title="Refund Deposit "
            ok-text="process"
            :loading="repayLoading"
            @on-ok="saveRepay"
          >
            <div class="form-group row container">
              <label
                for="default-input-rounded"
                class="col-3 form-control-label"
              >
                <h5>Description :</h5>
              </label>
              <div class="col-sm-8">
                <textarea
                  v-model="transactionData.description"
                  class="form-control"
                  name=""
                  id=""
                  cols="3"
                  rows="2  "
                ></textarea>
                <br />
              </div>
            </div>

            <div class="form-group row container">
              <label for="default-input-rounded" class="form-control-label">
                <h5>Amount Repay :</h5>
              </label>
              <div class="col-sm-8">
                <input
                  v-model="transactionData.refundAmount"
                  type="text"
                  placeholder="Enter Amount to refund"
                  class="form-control"
                  name=""
                  id=""
                />
                <br />
              </div>
            </div>
          </Modal>

          <Modal
            v-model="transactionDetailModal"
            title="Transaction Details"
            width="1000"
          >
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th>Transaction No</th>
                  <th>Refund Id</th>
                  <th>Description</th>
                  <th>Amount Deposit</th>
                  <th>Refund Amount</th>
                  <th>Baance</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(transaction, index) in transactDetails"
                  :key="index"
                >
                  <td>{{ transaction.transactionNumber }}</td>
                  <td>{{ transaction.repaymentTransactionNumber }}</td>
                  <td>{{ transaction.description }}</td>
                  <td>{{ transaction.depositLoanAmount }}</td>
                  <td>{{ transaction.refundAmount }}</td>
                  <td>{{ transaction.balance }}</td>
                  <td>{{ transaction.createdAt }}</td>
                </tr>
              </tbody>
            </table>
          </Modal>

          <Tabs :animated="false" type="card">
            <TabPane label="Issued">
              <div class="container">
                <div class="row">
                  <div class="col-3">
                    <Input
                      style="width: 250px"
                      v-model="search"
                      search
                      enter-button
                      placeholder="Enter supplier Name..."
                    />
                  </div>

                  <div class="col-3">
                    <select name="" id="" class="form-control">
                      <option value="" disabled selected>
                        Filter Issued by Status
                      </option>
                      <option value="all">Draft</option>
                      <option value="sent">Pending</option>
                      <option value="service">Accepted</option>
                      <option value="service">Rejected</option>
                      <option value="service">Cancelled</option>
                    </select>
                  </div>
                  <div class="col-4">
                    <div class="row">
                      <div class="col-6">
                        <DatePicker
                          type="date"
                          placeholder="from"
                          style="width: 200px"
                        ></DatePicker>
                      </div>
                      <div class="col-6">
                        <DatePicker
                          type="date"
                          placeholder="to"
                          style="width: 200px"
                        ></DatePicker>
                      </div>
                    </div>
                  </div>

                  <div class="col-2 text-right">
                    <button
                      data-toggle="modal"
                      data-target="#centralModalSm"
                      type="button"
                      class="btn btn-primary btn-sm ks-rounded text-right"
                    >
                      Issue Loan
                    </button>
                  </div>
                </div>
              </div>
              <br />

              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">Phone</th>
                    <th class="text-center">Transaction No.</th>
                    <th class="text-center">Description</th>
                    <th class="text-center">Currency</th>
                    <th class="text-center">Loan Amount</th>
                    <th class="text-center">Loan Balance</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(lonaSend, index) in loanSent" :key="index">
                    <td class="text-center">{{ lonaSend.client.name }}</td>
                    <td class="text-center">{{ lonaSend.client.phone }}</td>
                    <td class="text-center">
                      {{ lonaSend.transactionNumber }}
                    </td>
                    <td class="text-center">{{ lonaSend.description }}</td>
                    <td class="text-center">{{ lonaSend.currency }}</td>
                    <td class="text-center">
                      {{ lonaSend.depositLoanAmount }}
                    </td>
                    <td class="text-center">{{ lonaSend.balance }}</td>
                    <td class="text-center"><Tag type="info">Issued</Tag></td>
                    <td class="text-center">
                      <div class="dropdown ks-control">
                        <button
                          class="ivu-btn ivu-btn-default ivu-btn-circle ivu-btn-small"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span
                            ><i class="ivu-icon ivu-icon-md-more fsz-20"></i
                          ></span>
                        </button>
                        <div
                          class="dropdown-menu dropdown-menu-right sc-dropdown-menu show"
                        >
                          <button
                            class="dropdown-item"
                            @click="
                              showTransactionDetail(depositSend.repayments)
                            "
                          >
                            View Transaction
                          </button>
                          <button
                            class="dropdown-item"
                            @click="showTransactionDetail(lonaSend.repayments)"
                          >
                            Flag as Repaid
                          </button>
                          <button
                            class="dropdown-item"
                            @click="showTransactionDetail(lonaSend.repayments)"
                          >
                            send as Email
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabPane>
            <TabPane label="Recieved">
              <div class="container">
                <div class="row">
                  <div class="col-3">
                    <Input
                      style="width: 250px"
                      v-model="search"
                      search
                      enter-button
                      placeholder="Enter supplier Name..."
                    />
                  </div>
                  <div class="col-3">
                    <select name="" id="" class="form-control">
                      <option value="" disabled selected>
                        Filter Issued by Status
                      </option>
                      <option value="all">Draft</option>
                      <option value="sent">Pending</option>
                      <option value="service">Accepted</option>
                      <option value="service">Rejected</option>
                      <option value="service">Cancelled</option>
                    </select>
                  </div>
                  <div class="col-4">
                    <div class="row">
                      <div class="col-6">
                        <DatePicker
                          type="date"
                          placeholder="from"
                          style="width: 200px"
                        ></DatePicker>
                      </div>
                      <div class="col-6">
                        <DatePicker
                          type="date"
                          placeholder="to"
                          style="width: 200px"
                        ></DatePicker>
                      </div>
                    </div>
                  </div>

                  <div class="col-2 text-right">
                    <button
                      data-toggle="modal"
                      data-target="#depositRecieceModal"
                      type="button"
                      class="btn btn-primary btn-sm ks-rounded text-right"
                    >
                      New Recieve
                    </button>
                  </div>
                </div>
              </div>
              <br />
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="text-center">Name</th>
                    <th class="text-center">Phone</th>
                    <th class="text-center">Transaction No</th>
                    <th class="text-center">Description</th>
                    <th class="text-center">Currency</th>
                    <th class="text-center">Loan Amount</th>
                    <th class="text-center">Loan Balance</th>
                    <th class="text-center">Status</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(laonReceive, index) in loanRecieve" :key="index">
                    <td class="text-center">{{ laonReceive.client.name }}</td>
                    <td class="text-center">{{ laonReceive.client.phone }}</td>
                    <td class="text-center">
                      {{ laonReceive.transactionNumber }}
                    </td>
                    <td class="text-center">{{ laonReceive.description }}</td>
                    <td class="text-center">{{ laonReceive.currency }}</td>
                    <td class="text-center">
                      {{ laonReceive.depositLoanAmount }}
                    </td>
                    <td class="text-center">{{ laonReceive.balance }}</td>
                    <td class="text-center">Recieved</td>
                    <td class="text-center">
                      <div class="dropdown ks-control">
                        <button
                          class="ivu-btn ivu-btn-default ivu-btn-circle ivu-btn-small"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span
                            ><i class="ivu-icon ivu-icon-md-more fsz-20"></i
                          ></span>
                        </button>
                        <div
                          class="dropdown-menu dropdown-menu-right sc-dropdown-menu show"
                        >
                          <button
                            class="dropdown-item"
                            @click="
                              showTransactionDetail(laonReceive.repayments)
                            "
                          >
                            View Transaction
                          </button>
                          <button
                            class="dropdown-item"
                            @click="showTransactionDetail(lonaSend.repayments)"
                          >
                            Flag as Repaid
                          </button>
                          <button
                            class="dropdown-item"
                            @click="showTransactionDetail(lonaSend.repayments)"
                          >
                            send as Email
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import printJs from "print-js";
export default {
  data() {
    return {
      transactionDetailModal: false,
      transactDetails: "",
      repayModal: false,
      repayLoading: true,
      makeDeposit: false,
      recieveDeposit: true,
      transactionData: "",
      loanData: {
        owner: "owner",
        creator: "creator",
        business: "business",
        clientId: "",
        description: "anything",
        currency: "anything",
        depositLoanAmount: "120.86",
        makePayment: "anything",
        totalPayment: "",
        reference: "anything",
        validityOrRepaymentDate: "anything",
      },
      loanSent: "",
      loanRecieve: "",
      search: "",
      search1: "",
      userData: "",
      loading: false,
      loading1: false,
      showFirst: true,
      custSearchTriggered: false,
      customerCard: false,
      showReciever: true,
      networkRecieverTrigerred: false,
      customerNetworkCard: false,
      singleSupplier: "",
      singleReciever: "",
      suppliers: [],
      bussinesData: "",
    };
  },

  methods: {
    // changeDeposit(status){
    //   // console.log(status)
    //   this.makeDeposit =! this.makeDeposit
    //   this.recieveDeposit =! this.recieveDeposit
    //   console.log(this.makeDeposit)
    //   console.log(this.recieveDeposit)
    // },

    routeSummary() {
      this.$router.push({ name: "DepositLoan" });
    },
    showTransactionDetail(val) {
      this.transactionDetailModal = true;
      this.transactDetails = val;
    },

    toggleRepayModal(value) {
      this.repayModal = true;
      this.transactionData = value;
    },
    saveRepay() {
      this.refundLoading = true;
      const data = {
        business: this.bussinesData.businessId,
        owner: this.bussinesData.owner,
        creator: this.bussinesData.owner,
        depositLoanId: this.transactionData.id,
        description: this.transactionData.description,
        currency: this.transactionData.currency,
        refundAmount: this.transactionData.refundAmount,
      };
      this.$axios
        .post(
          `${this.$apiCloudenly}deposit-loan/repayment-refund`,
          data,
          this.$simpleAuthHeader
        )
        .then((resp) => {
          console.log(resp.data.message);
          this.$swal(resp.data.message);
          //  this.$Notice.success({
          //         title: 'Success',
          //         desc: resp.data.message
          //     });
          this.repayModal = false;
        })
        .catch((err) => {
          console.log(err);
          this.repayModal = false;
        });
    },

    routeCreateDeposit() {
      this.$router.push({ name: "DepositAccount" });
    },
    routeCreateLoan() {
      this.$router.push({ name: "LoanAccount" });
    },

    routeNetwork() {
      this.$router.push({ name: "CreateCommunity" });
    },

    trigeredReciever() {
      this.networkRecieverTrigerred = true;
      this.showReciever = false;
    },

    showRecieverModal() {
      this.showReciever = false;
      this.networkRecieverTrigerred = true;
      this.customerNetworkCard = false;
    },

    addReciever(val) {
      this.networkRecieverTrigerred = false;
      this.customerNetworkCard = true;
      this.singleReciever = val;
      this.loanData.clientId = val.id;
      // $("#myModal").modal("hide");
    },

    saveLoan() {
      // this.$axios
      //   .post(
      //     `${this.$apiCloudenly}deposit-loan/loan/receive`,
      //     this.loanData,
      //     this.$simpleAuthHeader
      //   )
      //   .then(resp => {
      //      const message = resp.data.message
      //         if(resp.data){
      //           this.$axios.get(`${this.$apiCloudenly}deposit-loan/loan/receive/${this.bussinesData.businessId}`, this.$simpleAuthHeader).then(resp =>{
      //             this.loanRecieve = resp.data
      //            this.$swal(message);
      //          $("#depositRecieceModal").modal("hide");
      //           }).catch(err => {
      //             console.log(err)
      //           })
      //         }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },

    //  Send loan to network
    sendLoan() {
      // this.$axios
      //   .post(
      //     `${this.$apiCloudenly}deposit-loan/loan/send`,
      //     this.loanData,
      //     this.$simpleAuthHeader
      //   )
      //   .then((resp) => {
      //     const message = resp.data.message;
      //     if (resp.data) {
      //       this.$axios
      //         .get(
      //           `${this.$apiCloudenly}deposit-loan/loan/send/${this.bussinesData.businessId}`,
      //           this.$simpleAuthHeader
      //         )
      //         .then((resp) => {
      //           this.loanSent = resp.data;
      //           this.$swal(message);
      //           $("#centralModalSm").modal("hide");
      //         })
      //         .catch((err) => {
      //           console.log(err);
      //         });
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
  computed: {
    filterSupplier() {
      return this.suppliers.filter((suppleier) => {
        return suppleier.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    filterReceiver() {
      return this.suppliers.filter((suppleier) => {
        return suppleier.name
          .toLowerCase()
          .includes(this.search1.toLowerCase());
      });
    },
  },

  mounted() {
    //   get list of inventory by storeid
    this.bussinesData = this.$store.state.userData;
    console.log(this.bussinesData);
    this.userData = JSON.parse(localStorage.getItem("business"));
    this.loanData.business = this.bussinesData.businessId;
    this.loanData.owner = this.bussinesData.owner;
    this.loanData.creator = this.bussinesData.owner;

    // get all network
    this.$axios
      .get(
        `${this.$apiCloudenly}network/all/${this.bussinesData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        this.suppliers = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });

    // get all issue made
    this.$axios
      .get(
        `${this.$apiCloudenly}deposit-loan/loan/send/${this.bussinesData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        this.loanSent = resp.data;
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    this.$axios
      .get(
        `${this.$apiCloudenly}deposit-loan/loan/receive/${this.bussinesData.businessId}`,
        this.$simpleAuthHeader
      )
      .then((resp) => {
        this.loanRecieve = resp.data;
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.vue-js-switch#changed-font {
  font-size: 16px;
}
</style>

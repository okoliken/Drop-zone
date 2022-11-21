 <template>
  <div>
    <back location="Organization Settings" class="mb-8" />

    <s-tabs
      :tabs="tabs"
      :activeTab="currentTab"
      @currentTab="currentTab = $event"
    />

    <component v-bind:is="currentTabComponent" />
  </div>
</template>

<script>
import Functions from "./function";
// import JobLevel from "./JobLevel";
// import Designations from "./Designation";
// import People from "./People";

export default {
  name: "OrganisationSettings",

  components: {
    Functions,
    // JobLevel,
    // Designations,
    // People,
  },
  data() {
    return {
      currentTab: "Functions",
      tabs: ["Functions"],
    };
  },

  computed: {
    currentTabComponent() {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },
  methods: {
    camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
    },
  },
};
</script>

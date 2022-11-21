<script>
import * as icons from "vue-feather-icons";

export default {
  name: "feather-icon",
  props: {
    icon: { type: String, required: true },
    svgClasses: { type: [String, Object, Array], default: "" },
    badge: {},
    locationBadge: {},
  },
  render(h) {
    let svg = h(icons[this.icon], { class: this.svgClasses });
    let badgeEl = h(
      "span",
      {
        class:
          "feather-icon-badge bg-danger text-white absolute px-2 py-1 rounded-full text-xs",
        style: "top: -9px; right: -7px",
      },
      [this.badge]
    );

    let badgeEl2 = h(
      "span",
      {
        class:
          "feather-icon-badge bg-primary text-white absolute px-2 py-1 rounded-full text-xs",
        style: "top: -9px; right: -7px",
      },
      [this.locationBadge]
    );
    let attr = {
      class: ["feather-icon select-none relative"],
      on: {
        click: this.clickFeather,
        mouseover: this.mouseoverFeather,
        mouseout: this.mouseoutFeather,
      },
    };

    let children = [svg];

    if (this.badge) children.push(badgeEl);
    if (this.locationBadge) children.push(badgeEl2);

    return h("span", attr, children);
  },
  methods: {
    clickFeather(event) {
      this.$emit("click", event);
    },
    mouseoverFeather(event) {
      this.$emit("mouseover", event);
    },
    mouseoutFeather(event) {
      this.$emit("mouseout", event);
    },
  },
};
</script>

<style>
@import "../assets/scss/vuesax/components/featherIcon.scss";
</style>
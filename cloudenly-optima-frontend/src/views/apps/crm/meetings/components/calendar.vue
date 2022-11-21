<template>
  <div id="calendar" class="tw-text-sm">
    <div>Sun</div>
    <div>Mon</div>
    <div>Tue</div>
    <div>Wed</div>
    <div>Thu</div>
    <div>Fri</div>
    <div>Sat</div>

    <div
      v-for="(day, index) in days"
      :key="index"
      :style="{ gridColumn: column(index) }"
      :class="{ today: today(day) }"
      class=" cursor-pointer"
    >
      {{ day.format("D") }}
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Calendar",
  data() {
    return {
      days: [],
    };
  },
  computed: {},
  methods: {
    column(index) {
      if (index == 0) {
        return this.days[0].day() + 1;
      }
    },
    today(day) {
      return moment().isSame(day, "day");
    },
  },
  mounted() {
    let monthDate = moment().startOf("month");
    this.days = [...Array(monthDate.daysInMonth())].map((_, i) =>
      monthDate.clone().add(i, "day")
    );
  },
};
</script>

<style scoped>
#calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-width: 1024px;
  width: 100%;
}

#calendar > * {
  align-items: center;
  display: flex;
  justify-content: center;
}

#calendar > *::before {
  content: "";
  display: inline-block;
  height: 0;
  padding-bottom: 100%;
  width: 1px;
}

#calendar > *.today {
  color: #fff;
  border-radius: 100%;
  background: #1034a6;
}
</style>

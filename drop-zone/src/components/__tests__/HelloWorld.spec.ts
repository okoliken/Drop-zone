import { describe, it, expect } from "vitest"

import { mount } from "@vue/test-utils"
import Dropzone from "@/components/drop-zone.vue"

describe("Dropzone", () => {
  it("renders properly", () => {
    const wrapper = mount(Dropzone, { props: { msg: "Hello Vitest" } })
    expect(wrapper.text()).toContain("Hello Vitest")
  })
})

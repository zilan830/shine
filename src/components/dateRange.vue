<template>
    <div class="hx-layout-container">
        <div class="hx-layout-header">
            <slot name="header"></slot>
        </div>
        <main class="hx-layout-content">
            <slot name="content"></slot>
        </main>
        <div class="hx-layout-footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
  name: 'hx-date-range',
  data() {
    return {};
  },
  methods: {
    selectItem() {

    },
    clickTitle() {

    },
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .hx-layout-container
        height: 100%
        display: flex
        overflow: hidden
        flex-direction: column
        background-color: #f7f7f7
        .hx-layout-content
            flex: 1
            overflow: hidden


</style>

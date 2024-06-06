<template>
  <q-page>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          class="new-ring"
          placeholder="what's happening?"
          v-model="newRingContent"
          counter
          maxlength="250"
          autogrow
        >
          <template v-slot:before>
            <q-avatar size="xl">
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </template>
        </q-input>
      </div>

      <div class="col col-shrink">
        <q-btn
          :disable="!newRingContent"
          unelevated
          rounded
          class="q-mb-lg"
          color="primary"
          label="Ring"
          no-caps
        />
      </div>
    </div>
    <q-separator class="divider" size="10px" color="grey-2" />
  </q-page>
</template>

<script setup>
defineOptions({
  name: "PageHome",
  data() {
    return {
      newRingContent: "",
    };
  },
});
</script>
<style lang="sass">
.new-ring
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
</style>

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
          @click="addNewRing"
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

    <q-list separator>
      <q-item v-for="ring in rings" :key="ring.date" class="q-py-md">
        <q-item-section avatar top>
          <q-avatar size="xl">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-subtitle1">
            <strong>Sarah L</strong>
            <span class="text-grey-t">@Sarah_l</span>
          </q-item-label>

          <q-item-label class="ring-content text-body1">
            {{ ring.content }}
          </q-item-label>

          <div class="ring-icons row justify-between q-mt-sm">
            <q-btn
              flat
              round
              color="grey"
              size="sm"
              icon="fa-regular fa-comment"
            />

            <q-btn flat round color="grey" size="sm" icon="fas fa-retweet" />

            <q-btn flat round color="grey" size="sm" icon="far fa-heart" />

            <q-btn
              @click="deleteRing(ring)"
              flat
              round
              color="grey"
              size="sm"
              icon="fas fa-trash"
            />
          </div>
        </q-item-section>

        <q-item-section side top>
          {{ getRelativeDate(ring.date) }}
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { formatDistance } from "date-fns";

defineOptions({
  name: "PageHome",
  data() {
    return {
      newRingContent: "",
      rings: [
        {
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          date: 1717805963965,
        },
        {
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          date: 1717806027894,
        },
      ],
    };
  },
  methods: {
    getRelativeDate(value) {
      return formatDistance(value, new Date());
    },
    addNewRing() {
      let newRing = {
        content: this.newRingContent,
        date: Date.now(),
      };
      this.rings.unshift(newRing);
    },
    deleteRing(ring) {
      //console.log("Delete Ring ", ring);
      let dateToDelete = ring.date;
      let index = this.rings.findIndex((ring) => ring.date === dateToDelete);
      //console.log("index: ", index);
      this.rings.splice(index, 1);
    },
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
.ring-content
  white-space: pre-line
.ring-icons
  margin-left: -5px
</style>

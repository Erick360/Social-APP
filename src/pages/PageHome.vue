<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute fullscreen">
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
        <transition-group
          appear
          enter-active-class="animated fadeIn slow"
          leave-active-class="animated fadeOut slow"
        >
          <q-item v-for="ring in rings" :key="ring.date" class="ring q-py-md">
            <q-item-section avatar top>
              <q-avatar size="xl">
                <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-subtitle1">
                <strong>Sarah L</strong>
                <span class="text-grey-7">
                  @Sarah_l
                  <br class="lt-md" />&bull; {{ getRelativeDate(ring.date) }}
                </span>
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

                <q-btn
                  flat
                  round
                  color="grey"
                  size="sm"
                  icon="fas fa-retweet"
                />

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
          </q-item>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script setup>
import { db } from "src/boot/firebase";
import { formatDistance } from "date-fns";

defineOptions({
  name: "PageHome",
  data() {
    return {
      newRingContent: "",
      rings: [
        /*{
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          date: 1717805963965,
        },
        {
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
          date: 1717806027894,
        },*/
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
      this.newRingContent = "";
    },
    deleteRing(ring) {
      //console.log("Delete Ring ", ring);
      let dateToDelete = ring.date;
      let index = this.rings.findIndex((ring) => ring.date === dateToDelete);
      //console.log("index: ", index);
      this.rings.splice(index, 1);
    },
  },
  mounted() {
    db.collection("rings").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New ring: ", change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified ring: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed ring: ", change.doc.data());
        }
      });
    });
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
.ring:not(:first-child)
  border-top: 1px solid rgba(0, 0, 0,0.12 )
</style>

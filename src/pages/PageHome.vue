<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
          <q-item v-for="ring in rings" :key="ring.id" class="ring q-py-md">
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

                <q-btn
                  @click="toggleLiked(ring)"
                  flat
                  round
                  size="sm"
                  :color="ring.liked ? 'pink' : 'grey'"
                  :icon="
                    ring.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
                  "
                />

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
      const timestamp = Date.now();
      const relativeDate = formatDistance(timestamp, new Date());
      return relativeDate;
    },
    addNewRing() {
      let newRing = {
        content: this.newRingContent,
        date: Date.now(),
        liked: false,
      };
      db.collection("rings")
        .add(newRing)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      //this.rings.unshift(newRing);
      this.newRingContent = "";
    },
    deleteRing(ring) {
      /*
      console.log("Delete Ring ", ring);
      let dateToDelete = ring.date;
      let index = this.rings.findIndex((ring) => ring.date === dateToDelete);
      console.log("index: ", index);
      this.rings.splice(index, 1);
      */
      db.collection("rings")
        .doc(ring.id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
    toggleLiked(ring) {
      //console.log("toggleRing");
      //console.log(ring);
      db.collection("rings")
        .doc(ring.id)
        .update({
          liked: !ring.liked,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          console.error("Error updating document: ", error);
        });
    },
  },
  mounted() {
    db.collection("rings")
      .orderBy("date")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const RingChange = change.doc.data();
          RingChange.id = change.doc.id;

          if (change.type === "added") {
            console.log("New ring: ", RingChange);
            this.rings.unshift(RingChange);
          }
          if (change.type === "modified") {
            console.log("Modified ring: ", RingChange);
            let index = this.rings.findIndex(
              (ring) => ring.id === RingChange.id
            );
            Object.assign(this.rings[index], RingChange);
          }

          if (change.type === "removed") {
            console.log("Removed ring: ", RingChange);
            let index = this.rings.findIndex(
              (ring) => ring.id === RingChange.id
            );
            this.rings.splice(index, 1);
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

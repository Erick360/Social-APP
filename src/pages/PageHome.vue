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

    <q-list>
         <q-item class="q-py-md">
           <q-item-section avatar top>
             <q-avatar size="xl">
               <img src="https://cdn.quasar.dev/img/avatar2.jpg">
             </q-avatar>
           </q-item-section>

           <q-item-section>
             <q-item-label class="text-subtitle1">
              <strong>Sarah L</strong>
              <span class="text-grey-t">@Sarah_l</span>
             </q-item-label>

             <q-item-label class="ring-content text-body1">
               Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
               tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
               quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
               consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
               cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
               proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
             </q-item-label>
             
             <div class="ring-icons row justify-between q-mt-sm">
                <q-btn 
                flat 
                round 
                color="grey"
                size="sm" 
                icon="fa-regular fa-comment" />

                <q-btn 
                flat 
                round 
                color="grey"
                size="sm" 
                icon="fas fa-retweet" />

                <q-btn 
                flat 
                round 
                color="grey"
                size="sm" 
                icon="far fa-heart" />

                <q-btn 
                flat 
                round 
                color="grey"
                size="sm" 
                icon="fas fa-trash" />
             </div>

           </q-item-section>

           <q-item-section side top>
             1 min ago
           </q-item-section>
         </q-item>

        

       </q-list>
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
.ring-content
  white-space: pre-line
.ring-icons
  margin-left: -5px
</style>

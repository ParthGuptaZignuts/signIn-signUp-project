<script setup lang="ts">
interface Image {
  id: string
  urls: { regular: string }
  alt_description: string
  user: { name: string; profile_image: { medium: string }; location: string }
}
defineProps<{
  images: Image[]
  error?: string
}>()
</script>
<template>
  <div class="ma-10">
    <div v-if="images && !error">
      <VRow>
        <VCol
          v-for="image of images"
          :key="image.id"
          class="d-flex child-flex"
          cols="12"
          lg="4"
          md="4"
          sm="6"
        >
          <VImg
            :lazy-src="`https://picsum.photos/10/6?image=${3 * 5 + 10}`"
            :src="image.urls.regular"
            aspect-ratio="1"
            :alt="image.alt_description"
            class="bg-grey-lighten-2 rounded-lg"
            cover
          >
            <VCardTitle
              class="text-h6 text-white d-flex justify-space-between position-absolute w-100 align-center"
              style="bottom: 0px"
            >
              <div class="d-flex align-center">
                <VAvatar size="36px">
                  <v-img
                    v-if="image.user"
                    alt="Avatar"
                    :src="image.user.profile_image.medium"
                  ></v-img>
                </VAvatar>
                <div class="ml-4">
                  <p>{{ image.user.name }}</p>
                  <p class="ma-0 text-body-1 font-weight-bold"></p>
                  <p class="text-caption font-weight-medium">{{ image.user.location }}</p>
                </div>
              </div>
              <a
                :href="image.urls.regular"
                :download="`image_${image.id}`"
                v-if="image.urls.regular"
              >
                <VIcon color="white" icon="mdi-eye" size="large"></VIcon>
              </a>
            </VCardTitle>
            <template v-slot:placeholder>
              <VRow align="center" class="fill-height ma-0" justify="center">
                <VProgressCircular color="grey-lighten-5" indeterminate></VProgressCircular>
              </VRow>
            </template>
          </VImg>
        </VCol>
      </VRow>

      <div v-if="images.length <= 0">
        <VAlert type="warning" dismissible> Images not found. </VAlert>
      </div>
    </div>

    <div v-else-if="error">
      <VAlert type="warning" dismissible> {{ error }} </VAlert>
    </div>
  </div>
</template>

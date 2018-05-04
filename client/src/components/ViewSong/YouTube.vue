<template>
  <panel title="YouTube Videos">
    <youtube
      :video-id="youtubeId"
      :player-width="500"
      :player-height="250">
    </youtube>
  </panel>
</template>

<script>
import VueYouTubeEmbed from "vue-youtube-embed";

export default {
  props: ["youtubeId"],
  components: {
    VueYouTubeEmbed
  }
};

</script>

<style>

</style>

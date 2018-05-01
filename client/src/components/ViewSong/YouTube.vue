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
import Panel from "@/components/Panel";
import VueYouTubeEmbed from "vue-youtube-embed";

export default {
  props: ["youtubeId"],
  components: {
    Panel,
    VueYouTubeEmbed
  }
};

</script>

<style>

</style>

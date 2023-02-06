<template>
  <span
    class="no-lib no-input-text"
    :class="{ fullWidth, error }"
    @click="componentClick"
  >
    <label v-if="isSlot">
      <slot />
    </label>
    <span class="input-text">
      <input
        v-model="localValue"
        :type="displayType"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly || loading"
        :min="min"
        :max="max"
        @focus="e => $emit('focus', e)"
        @focusout="e => $emit('focusout', e)"
      />
      <span
        v-if="displayIconRight"
        class="icon-right"
        :class="{ eye }"
        @click="clickIconRight"
        v-html="mdiIcon(displayIconRight, 'rgb(100,100,100)')"
      />
      <span
        v-if="loading"
        class="content-loader"
      >
        <span class="loader" />
      </span>
    </span>
    <span v-if="!!error && typeof error === 'string'" class="text-error">
      {{ error }}
    </span>
  </span>
</template>

<script>

  import { mdiIcon } from '../../lib/mdi-icon'
  import { modelInput } from 'assets/no-lib/mixins/model-input'

  export default {
    name: "no-input-text",
    mixins: [modelInput],
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      loading: {
        type: [Boolean, Number],
        default: false
      },
      error: {
        type: [Boolean, String],
        default: false
      },
      fullWidth: {
        type: Boolean,
        default: false
      },
      iconRight: {
        type: String,
        default: null
      },
      eye: {
        type: Boolean,
        default: false
      },
      min: {
        type: [String, Number],
        default: null
      },
      max: {
        type: [String, Number],
        default: null
      }
    },
    methods: {
      componentClick (e) {
        this.$emit('click', e)
      },
      clickIconRight (e) {
        this.$emit('click:icon-right', e)
        if (this.eye) this.showPassword = !this.showPassword
      }
    },
    computed: {
      isSlot () {
        return !!this.$slots?.default?.length
      },
      displayIconRight () {
        if (this.eye) return this.showPassword ? 'eye-outline' : 'eye-off-outline'
        return this.iconRight
      },
      displayType () {
        if (this.eye && this.type === 'password' && this.showPassword) return 'text'
        return this.type
      }
    },
    data: () => ({
      mdiIcon,
      showPassword: false
    })
  }

</script>

<style scoped>

  .no-input-text
  {
    --primary: var(--bleu);
    --primary-rgb: var(--bleu-rgb);

    display: flex;
    flex-direction: column;
    column-gap: 10px;
  }

  .input-text
  {
    display: flex;
    padding: 5px;
    background-color: rgba(var(--primary-rgb), 0);
    border-radius: 10px;
    position: relative;
    transition: .3s;
  }

  .no-input-text:not(.fullWidth) .input-text
  {
    max-width: 500px;
  }

  .no-input-text label
  {
    padding: 0 5px;
  }

  .input-text input
  {
    padding: 5px 12px;
    border-radius: 7px;
    background-color: white;
    box-shadow: 0 0 2px rgba(0,0,0,.7);
    border: 1px solid white;
    width: 100%;
    transition: .3s;
  }

  .input-text input:disabled
  {
    background-color: rgb(240,240,240);
    border-color: rgb(240,240,240);
  }

  .input-text input:focus,
  .no-menu-open .input-text input
  {
    box-shadow: 0 0 5px var(--primary);
    border-color: var(--primary);
  }

  .input-text:has(input:not(:disabled)):hover,
  .input-text:has(input:focus),
  .no-menu-open .input-text
  {
    background-color: rgba(var(--primary-rgb), .3);
  }

  .input-text input::placeholder
  {
    color: rgb(210,210,210);
    transition: .2s;
  }

  .input-text input:not(:read-only):focus::placeholder
  {
    opacity: .2;
  }

  .input-text input:read-only::selection
  {
    background-color: transparent;
    color: black;
  }

  .icon-right
  {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
  }

  .icon-right.eye
  {
    cursor: pointer;
  }

  .input-text:has(.icon-right) input
  {
    padding-right: 30px;
  }

  .content-loader
  {
    position: absolute;
    left: 15px;
    width: calc(100% - 30px);
    height: 3px;
    bottom: 5px;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
  }

  .loader
  {
    height: 100%;
    width: 0;
    left: 0;
    bottom: 0;
    margin-left: auto;
    margin-right: 0;
    position: absolute;
    background-color: var(--primary);
    animation: loading 1s ease-in-out infinite;
  }

  @keyframes loading {
    0% {
      width: 0;
      left: 0;
    }
    20% {
      left: 0;
    }
    50% {
      width: 60%;
    }
    80% {
      left: 100%;
    }
    100% {
      left: 100%;
      width: 0;
    }
  }

  /* @keyframes loading-2 {
    0% {
      width: 0;
      left: 0;
    }
    20% {
      width: 40%;
      left: 0;
    }
    40% {
      width: 60%;
      left: 20%;
    }
    70% {
      width: 40%;
      left: 70%;
    }
    100% {
      width: 0;
      left: 100%;
    }
  }

  @keyframes loading-1 {
    0% {
      width: 0;

      left: 0;
      right: auto;
    }
    50% {
      width: 100%;

      left: 0;
      right: auto;
    }
    51% {
      right: 0;
      left: auto;
    }
    100% {
      width: 0;

      right: 0;
      left: auto;
    }
  } */

  .no-input-text.error
  {
    --primary: var(--rouge);
    --primary-rgb: var(--rouge-rgb);
  }

  .text-error
  {
    color: var(--primary);
    padding: 0 5px;
  }

  .no-input-text.error input
  {
    box-shadow: 0 0 5px var(--primary);
    border-color: var(--primary);
  }

</style>

<template>
  <div class="home-page">
    <header class="hero">
      <div class="hero-content">
        <h1>Welcome to Vue 3 Composition API Dialog Components</h1>
        <p>Navigate through the various features using the links below.</p>
      </div>
    </header>
    <section class="features">
      <div
        class="feature"
        v-for="(item, index) in routeLists"
        :key="index">
        <RouterLink
          :to="item.path"
          class="feature-link">
          <div class="feature-card">
            <h2>{{ item.label }}</h2>
            <p>Explore {{ item.label }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  const routeLists = [
    { path: '/file-picker', label: 'File Picker', name: 'file-picker' },
    { path: '/confirm-dialog', label: 'Confirm Dialog', name: 'confirm-dialog' },
    { path: '/dialog-box', label: 'Dialog Box', name: 'dialog-box' },
    { path: '/toast-page', label: 'Toast Page', name: 'toast-page' }
  ] as { path: string; label: string; name: string }[]
</script>

<style lang="scss">
  .home-page {
    text-align: center;
    padding: 2rem;

    .hero {
      background: linear-gradient(135deg, #6e8efb, #a777e3);
      color: #fff;
      padding: 4rem 2rem;
      border-radius: 10px;
      margin-bottom: 2rem;

      .hero-content {
        max-width: 800px;
        margin: 0 auto;

        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.2rem;
        }
      }
    }

    .features {
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      justify-content: center;

      .feature {
        width: 300px;

        .feature-link {
          text-decoration: none;

          .feature-card {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            transition: transform 0.3s;

            &:hover {
              transform: translateY(-10px);
            }

            h2 {
              font-size: 1.5rem;
              margin-bottom: 0.5rem;
              color: #333;
            }

            p {
              font-size: 1rem;
              color: #666;
            }
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .home-page .hero {
      padding: 2rem 1rem;

      .hero-content h1 {
        font-size: 2.5rem;
      }

      .hero-content p {
        font-size: 1rem;
      }
    }

    .home-page .features .feature {
      width: 100%;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 480px) {
    .home-page .hero {
      padding: 1rem 0.5rem;

      .hero-content h1 {
        font-size: 2rem;
      }

      .hero-content p {
        font-size: 0.9rem;
      }
    }

    .home-page .features .feature .feature-card {
      padding: 1rem;

      h2 {
        font-size: 1.2rem;
      }

      p {
        font-size: 0.9rem;
      }
    }
  }
</style>

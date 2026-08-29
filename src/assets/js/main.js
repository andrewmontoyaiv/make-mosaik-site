import Alpine from "alpinejs";
import "../css/main.css";
window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {

  Alpine.data("orbitField", () => ({

    move(event) {

      if (window.innerWidth < 768) {
        return;
      }

      const bodies =
        event.currentTarget.querySelectorAll(
          "[data-orbit-body]"
        );

      bodies.forEach((body) => {

        const rect =
          body.getBoundingClientRect();

        const centerX =
          rect.left + rect.width / 2;

        const centerY =
          rect.top + rect.height / 2;

        const dx =
          event.clientX - centerX;

        const dy =
          event.clientY - centerY;

        const distance =
          Math.sqrt(
            dx * dx +
            dy * dy
          );

        const radius =
          Number(body.dataset.radius ?? 280);

        const strength =
          Number(body.dataset.strength ?? 0.18);

        const maxMovement =
          Number(body.dataset.maxMovement ?? 45);

        if (distance > radius) {

          body.style.setProperty(
            "--mouse-x",
            "0px"
          );

          body.style.setProperty(
            "--mouse-y",
            "0px"
          );

          return;
        }

        const influence =
          1 - distance / radius;

        let x =
          dx *
          strength *
          influence;

        let y =
          dy *
          strength *
          influence;

        const movement =
          Math.sqrt(
            x * x +
            y * y
          );

        if (movement > maxMovement) {

          const scale =
            maxMovement / movement;

          x *= scale;
          y *= scale;
        }

        body.style.setProperty(
          "--mouse-x",
          `${x}px`
        );

        body.style.setProperty(
          "--mouse-y",
          `${y}px`
        );
      });
    },

    reset() {

      this.$el
        .querySelectorAll(
          "[data-orbit-body]"
        )
        .forEach((body) => {

          body.style.setProperty(
            "--mouse-x",
            "0px"
          );

          body.style.setProperty(
            "--mouse-y",
            "0px"
          );
        });
    }

  }));

});

Alpine.start();
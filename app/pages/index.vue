<script setup>
const { t } = useI18n();
const { gsap, SplitText } = useGsap();
const { shifterBg, bgVisible, footerNav } = useConfig();

let mm = null;
const splitTitle = ref(null);
const leftLineGrow = ref(null);
const rightLineGrow = ref(null);
const zoomingImgs = ref([]);

const zoomingImages = [
    {
        desktop: "/img/blue_face.jpg",
        tablet: "/img/blue_face_tab.jpg",
        mobile: "/img/blue_face_mob.jpg",
    },
    {
        desktop: "/img/hologram_green.jpg",
        tablet: "/img/hologram_green_tab.jpg",
        mobile: "/img/hologram_green_mob.jpg",
    },
    {
        desktop: "/img/render_3d.jpg",
        tablet: "/img/render_3d_tab.jpg",
        mobile: "/img/render_3d_mob.jpg",
    },
    {
        desktop: "/img/sea_water.jpg",
        tablet: "/img/sea_water_tab.jpg",
        mobile: "/img/sea_water_mob.jpg",
    },
];
const cuttingContainer = ref(null);
const leftCurtain = ref(null);
const rightCurtain = ref(null);
const aboutNitro = ref(null);
const aboutFrames = ref([]);
const aboutTextContainers = ref([]);
let aboutSplits = [];
const aboutItems = [
    { digit: 8, progress: 8 + " " + t("text.year", 2) },
    { digit: 200, progress: "200+" },
    { digit: 97, progress: "97.1%" },
];

const caseItems = ref([]);

const marqueeSection = ref(null);
const marqueeTitles = ref(null);
const marqueeItems = [
    "promotion",
    "design",
    "target",
    "leads",
    "content",
    "consulting",
    "automation",
    "research",
    "development",
];
const advantageSection = ref(null);
const rotatingImage = ref(null);
const advantageSlides = ref([]);
const advantageImages = [
    "/img/advantage/1.jpg",
    "/img/advantage/2.jpg",
    "/img/advantage/3.jpg",
    "/img/advantage/4.jpg",
];
const feedbackSection = ref(null);
const leftGate = ref(null);
const rightGate = ref(null);
const feedbackNitro = ref(null);

onBeforeUpdate(() => {
    zoomingImgs.value = [];
    aboutFrames.value = [];
    aboutTextContainers.value = [];
    caseItems.value = [];
    advantageSlides.value = [];
});

function initGsap() {
    mm = gsap.matchMedia();
    mm.add(
        {
            isDesktop: "(min-width: 769px)",
            isTablet: "(min-width: 640px) and (max-width: 768px)",
            isMobile: "(max-width: 639px)",
        },
        (context) => {
            let { isDesktop, isTablet, isMobile } = context.conditions;

            // HERO TITLE
            const titles = gsap.utils.toArray(".text_separate");
            splitTitle.value = new SplitText(titles, {
                type: "words,lines",
                linesClass: "line",
                autoSplit: true,
                mask: "lines",
            });
            gsap.from(splitTitle.value.lines, {
                yPercent: 120,
                delay: 3.6,
                duration: 1,
                opacity: 0,
                ease: "expo.out",
                stagger: 0.15,
                zIndex: 0,
            });

            // VERTICAL LINES
            const curtainTL = gsap.timeline({
                scrollTrigger: {
                    trigger: "#line_container",
                    start: "top top",
                    end: "+=200%",
                    scrub: 1,
                    pin: true,
                    pinType: isMobile ? "fixed" : "transform",
                    // invalidateOnRefresh: true, // Полезно для ресайза
                },
            });

            curtainTL.to([leftLineGrow.value, rightLineGrow.value], {
                height: "100vh",
                duration: 1,
                ease: "none",
                zIndex: 10,
            });
            curtainTL.call(
                () => {
                    footerNav.value = true;
                },
                [],
                ">",
            );
            curtainTL.call(
                () => {
                    footerNav.value = false;
                },
                [],
                ">",
            );

            curtainTL.to([leftLineGrow.value, rightLineGrow.value], {
                width: isMobile ? "100vw" : "50vw",
                duration: 1,
                ease: "none",
            });

            // ZOOMING
            const scalingTL = gsap.timeline({
                scrollTrigger: {
                    trigger: "#zooming_section",
                    start: "top top",
                    end: "+=300%",
                    scrub: 1,
                    pin: true,
                    pinType: isMobile ? "fixed" : "transform",
                },
            });

            gsap.set(zoomingImgs.value, { scale: 0, opacity: 1 });
            gsap.set(cuttingContainer.value, { scale: 0 });
            gsap.set(aboutNitro.value, { yPercent: 100, zIndex: 4 });

            curtainTL.to([leftLineGrow.value, rightLineGrow.value], {
                opacity: 0,
                duration: 0.1,
            });

            zoomingImgs.value.forEach((img, index) => {
                scalingTL.to(
                    img,
                    {
                        scale: 1,
                        duration: 1,
                        ease: "none",
                        delay: 0.5,
                        onComplete: () => (bgVisible.value = false),
                        onReverseComplete: () => (bgVisible.value = true),
                    },
                    index * (1 / 4),
                );
            });

            scalingTL.to(
                cuttingContainer.value,
                { scale: 1, duration: 1, ease: "ease", delay: 0.5 },
                1.25,
            );

            // CURTAINS
            scalingTL.to([leftCurtain.value, rightCurtain.value], {
                x: (i) =>
                    i === 0
                        ? isMobile
                            ? "-60vw"
                            : "-50vw"
                        : isMobile
                          ? "60vw"
                          : "50vw",
                duration: 1.5,
                ease: "none",
            });

            scalingTL.to(
                zoomingImgs.value,
                { opacity: 0, duration: 0.1 },
                "<-=0.1",
            );
            scalingTL.fromTo(
                aboutNitro.value,
                { opacity: 1, duration: 0.1, ease: "none" },
                { yPercent: 0, duration: 2, ease: "none" },
                "<",
            );

            // ABOUT
            aboutTextContainers.value.forEach((container) => {
                const numberTargets = container.querySelectorAll(
                    "[data-split-number]",
                );
                const textTargets =
                    container.querySelectorAll("[data-split-text]");

                const numberSplit = new SplitText(numberTargets, {
                    type: "lines",
                    linesClass: "split-line",
                });
                const textSplit = new SplitText(textTargets, {
                    type: "words",
                    wordsClass: "split-word",
                });
                aboutSplits.push({ numbers: numberSplit, text: textSplit });
            });

            aboutSplits.forEach((split, index) => {
                if (index > 0) {
                    gsap.set(split.numbers.lines, {
                        yPercent: 100,
                        autoAlpha: 1,
                    });
                    gsap.set(split.text.words, { yPercent: 100, autoAlpha: 0 });
                }
            });
            gsap.set(aboutFrames.value.slice(1), { autoAlpha: 0, scale: 1.05 });
            gsap.set(aboutFrames.value[0], { autoAlpha: 1, scale: 1 });

            const aboutTL = gsap.timeline({
                scrollTrigger: {
                    trigger: "#numbers",
                    start: "top top",
                    end: `+=${aboutItems.length * 100}%`,
                    scrub: 1,
                    pin: true,
                    pinType: isMobile ? "fixed" : "transform",
                },
            });
            aboutItems.forEach((_, i) => {
                if (i < aboutItems.length - 1) {
                    aboutTL.to(
                        aboutSplits[i].numbers.lines,
                        { yPercent: -100, duration: 1.5, ease: "power2.in" },
                        `+=${i === 0 ? 0 : 0.5}`,
                    );
                    aboutTL.to(
                        aboutSplits[i].text.words,
                        {
                            yPercent: -100,
                            autoAlpha: 0,
                            stagger: 0.03,
                            duration: 1.5,
                        },
                        `<`,
                    );
                    aboutTL.to(
                        aboutFrames.value[i],
                        {
                            scale: 1.05,
                            autoAlpha: 1,
                            duration: 1.5,
                            ease: "power2.in",
                        },
                        "<",
                    );
                    aboutTL.to(
                        aboutFrames.value[i + 1],
                        {
                            scale: 1,
                            autoAlpha: 1,
                            duration: 1.5,
                            ease: "power2.in",
                        },
                        "<",
                    );
                    aboutTL.to(
                        aboutSplits[i + 1].numbers.lines,
                        { yPercent: 0, duration: 0.8, ease: "power2.out" },
                        "<+=0.5",
                    );
                    aboutTL.to(
                        aboutSplits[i + 1].text.words,
                        {
                            yPercent: 0,
                            autoAlpha: 1,
                            stagger: 0.03,
                            duration: 1,
                        },
                        "<",
                    );
                }
            });

            // CASES
            if (marqueeSection.value) {
                gsap.set(marqueeTitles.value, { xPercent: 0 });
                gsap.to(marqueeTitles.value, {
                    xPercent: -50,
                    ease: "none",
                    duration: 20,
                    repeat: -1,
                });
            }

            // ADVANTAGES
            if (advantageSection.value) {
                const slides = advantageSlides.value;
                const total = slides.length;
                if (isMobile) {
                    gsap.set(slides, {
                        autoAlpha: 0,
                        yPercent: 20,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                    });
                    gsap.set(slides[0], { autoAlpha: 1, yPercent: 0 });
                } else {
                    gsap.set(slides, {
                        position: "relative",
                        autoAlpha: 1,
                        yPercent: 0,
                    });
                }
                gsap.set(rotatingImage.value, { rotationY: 0, scaleX: 1 });
                const advantageTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: advantageSection.value,
                        start: "top top",
                        end: `+=${total * 100}%`,
                        scrub: 1,
                        pin: isMobile ? true : advantageSection.value,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });
                for (let i = 0; i < total - 1; i++) {
                    const nextIndex = i + 1;
                    if (isMobile) {
                        advantageTL
                            .to(slides[i], {
                                autoAlpha: 0,
                                yPercent: -20,
                                ease: "none",
                            })
                            .to(slides[nextIndex], { autoAlpha: 1 })
                            .to(
                                slides[nextIndex],
                                { autoAlpha: 1, yPercent: 0, ease: "none" },
                                "<",
                            );
                    } else {
                        advantageTL.to(slides, {
                            yPercent: -nextIndex * 100,
                            ease: "none",
                        });
                    }

                    const label = `slideTransition_${i}`;
                    advantageTL.addLabel(label, "<");
                    advantageTL.to(
                        rotatingImage.value,
                        {
                            rotationY: "+=180",
                            ease: "none",
                        },
                        label,
                    );
                    const isBackSide = nextIndex % 2 !== 0;
                    advantageTL.set(
                        rotatingImage.value,
                        {
                            attr: { src: advantageImages[nextIndex] },
                            scaleX: isBackSide ? -1 : 1,
                            immediateRender: true,
                        },
                        "<50%",
                    );
                }
            }

            // FEEDBACK
            if (feedbackSection.value) {
                gsap.set(feedbackNitro.value, { yPercent: 100, zIndex: 0 });
                const feedbackTL = gsap.timeline({
                    scrollTrigger: {
                        trigger: feedbackSection.value,
                        start: "top top",
                        end: "+=200%",
                        scrub: 1,
                        pin: true,
                    },
                });
                feedbackTL.to(
                    [leftGate.value, rightGate.value],
                    {
                        x: (i) =>
                            i === 0
                                ? isMobile
                                    ? "-60vw"
                                    : "-50vw"
                                : isMobile
                                  ? "60vw"
                                  : "50vw",
                        duration: 1.5,
                        ease: "none",
                    },
                    "+=0.5",
                );
                feedbackTL.to(
                    feedbackNitro.value,
                    { yPercent: 0, duration: 2, zIndex: 7, ease: "none" },
                    "<",
                );
            }
        },
    );
}

function cleanGsap() {
    if (mm) mm.revert();
    mm = null;
    splitTitle.value = null;
    aboutSplits = [];
}
onMounted(() => {
    initGsap();
});
onUnmounted(() => {
    cleanGsap();
});
</script>
<template>
    <div class="w-full relative">
        <section
            id="hero"
            class="relative flex flex-col justify-center items-center h-screen"
        >
            <div class="lg:min-w-lg xl:min-w-2xl" aria-hidden="true">
                <h1
                    class="text_separate will-change-transform text-4xl xs:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase h-20 xs:h-24 sm:h-28 lg:h-36 xl:h-48"
                >
                    <span class="block">
                        {{ $t("title.internet") }}
                    </span>
                    <span class="block ml-4 xs:ml-10 sm:ml-16">
                        {{ $t("title.marketing") }}
                    </span>
                </h1>
                <div
                    class="text-xs xs:text-base sm:text-lg font-bold uppercase relative z-10"
                >
                    <p>{{ $t("title.for_your_business") }}</p>
                </div>
            </div>
            <div
                id="line_container"
                class="absolute w-screen h-screen overflow-hidden"
            >
                <div
                    ref="leftLineGrow"
                    class="fixed top-1/2 left-1/2 h-0 w-2 -mr-0.5 -translate-y-1/2 -translate-x-full bg-primary"
                ></div>
                <div
                    ref="rightLineGrow"
                    class="fixed top-1/2 left-1/2 h-0 w-2 -ml-0.5 -translate-y-1/2 bg-primary"
                ></div>
            </div>
        </section>

        <section id="zooming_section">
            <div class="relative w-screen h-screen overflow-hidden">
                <picture
                    v-for="(item, index) in zoomingImages"
                    :key="index"
                    :ref="
                        (el) => {
                            if (el) zoomingImgs[index] = el;
                        }
                    "
                    class="zooming_img"
                    :style="{ zIndex: index + 1 }"
                >
                    <source media="(max-width: 639px)" :srcset="item.mobile" />
                    <source media="(max-width: 768px)" :srcset="item.tablet" />
                    <img
                        :src="item.desktop"
                        alt="Zooming"
                        class="zooming_img"
                    />
                </picture>

                <div
                    id="about"
                    ref="aboutNitro"
                    class="absolute top-0 left-0 w-full h-full bg-white py-8"
                >
                    <div class="section">
                        <div class="px-4 sm:px-20 md:px-32 mb-8">
                            <h2
                                class="text-3xl md:text-4xl lg:text-5xl font-bold uppercase z-0"
                            >
                                {{ $t("title.about.name") }}
                            </h2>
                            <p
                                v-html="$t('title.about.desc')"
                                class="text-lg sm:text-xl md:text-2xl ml-0 md:ml-20 uppercase"
                            ></p>
                        </div>
                        <div
                            class="bg-[url(/img/bg_about.jpg)] bg-no-repeat bg-contain pb-[56.25%] w-full"
                        ></div>
                    </div>
                </div>

                <div
                    ref="cuttingContainer"
                    class="absolute top-0 left-0 w-screen h-screen flex overflow-hidden z-5"
                >
                    <div ref="leftCurtain" class="gate z-5">
                        <h2
                            class="left-full -translate-x-1/2 uppercase"
                            v-html="$t('title.advertising_agency')"
                        ></h2>
                    </div>
                    <div ref="rightCurtain" class="gate z-5">
                        <h2
                            class="right-full translate-x-1/2 uppercase"
                            v-html="$t('title.advertising_agency')"
                        ></h2>
                    </div>
                </div>
            </div>
        </section>

        <section id="numbers" class="relative">
            <div class="sticky top-0 h-screen w-full overflow-hidden">
                <div
                    v-for="(item, i) in aboutItems"
                    :key="i"
                    :ref="
                        (el) => {
                            if (el) aboutFrames[i] = el;
                        }
                    "
                    class="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    :style="{
                        backgroundImage: `url(/img/bg_about_${i + 1}.jpg)`,
                    }"
                >
                    <div
                        :ref="
                            (el) => {
                                if (el) aboutTextContainers[i] = el;
                            }
                        "
                        class="relative w-full h-full p-4"
                    >
                        <div class="absolute top-4 left-4 z-0">
                            <div class="overflow-hidden">
                                <h2
                                    data-split-number
                                    class="text-white/10 text-9xl sm:text-[12rem] md:text-[20rem] leading-60 font-black"
                                >
                                    {{ item.digit }}
                                </h2>
                            </div>
                        </div>
                        <div
                            class="relative flex flex-col items-stretch justify-evenly h-full max-w-4xl mx-auto text-center z-5"
                        >
                            <div class="flex flex-col gap-4 items-center">
                                <div class="overflow-hidden">
                                    <h2
                                        data-split-number
                                        class="text-6xl sm:text-8xl md:text-9xl font-bold text-center uppercase text-primary"
                                    >
                                        {{ item.progress }}
                                    </h2>
                                </div>
                                <h3
                                    data-split-text
                                    class="text-3xl font-light uppercase text-white"
                                >
                                    {{ $t(`title.about_${i + 1}.name`) }}
                                </h3>
                            </div>
                            <p
                                data-split-text
                                v-html="$t(`title.about_${i + 1}.desc`)"
                                class="text-xl font-light uppercase text-white"
                            ></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            id="cases"
            class="relative bg-cover bg-center bg-no-repeat sm:bg-fixed bg-[url(/img/bg_cases_mob.jpg)] xs:bg-[url(/img/bg_cases_tab.jpg)] lg:bg-[url(/img/bg_cases.jpg)]"
        >
            <div
                class="min-h-screen w-full flex items-center justify-center py-10"
            >
                <div
                    class="section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6 w-full h-full"
                >
                    <div
                        v-for="(n, i) in 8"
                        :key="i"
                        :ref="
                            (el) => {
                                if (el) caseItems[i] = el;
                            }
                        "
                        class="relative flex flex-col gap-2"
                    >
                        <div
                            class="case_item relative flex flex-col gap-2 w-full xl:w-70 rounded-xl overflow-hidden group"
                        >
                            <div
                                class="absolute inset-0 w-full h-full px-8 cursor-pointer flex items-center justify-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            >
                                <p
                                    v-html="$t(`title.case_${n}.desc`)"
                                    class="text-xs tracking-widest text-white font-medium text-center uppercase scale-50 group-hover:scale-100 transition-transform duration-400"
                                ></p>
                            </div>
                            <img
                                :src="`/img/case/${n}.jpg`"
                                class="w-full h-full object-contain"
                            />
                        </div>
                        <h2
                            v-html="$t(`title.case_${n}.name`)"
                            class="uppercase font-bold text-center"
                        ></h2>
                    </div>
                </div>
            </div>
        </section>

        <section
            id="services"
            ref="serviceSection"
            class="relative min-h-screen bg-white"
        >
            <div class="pb-8 text-center sm:text-left">
                <div class="bg-primary py-2">
                    <h1 class="section text-2xl font-bold uppercase">
                        {{ $t("title.service.name") }}
                    </h1>
                </div>
                <div class="section font-regular uppercase">
                    <p v-html="$t('title.service.desc')"></p>
                </div>
            </div>
            <div class="flex items-center justify-center">
                <SliderAuto class="section" />
            </div>
        </section>

        <section ref="marqueeSection">
            <div
                class="bg-white py-10 whitespace-nowrap w-full z-10 overflow-hidden"
            >
                <div
                    ref="marqueeTitles"
                    class="flex items-center w-fit will-change-transform"
                >
                    <div
                        v-for="(n, k) in 2"
                        :key="k"
                        class="flex items-center gap-8 sm:gap-12 pr-8 sm:pr-12 text-lg sm:text-2xl font-bold uppercase"
                    >
                        <p v-for="(item, i) in marqueeItems" :key="i">
                            {{ $t(`text.${item}`) }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section
            ref="advantageSection"
            class="relative overflow-hidden bg-gray-200 h-screen"
        >
            <div
                class="relative z-5 flex flex-col sm:grid sm:grid-cols-2 min-h-screen"
            >
                <div
                    class="relative overflow-hidden h-[45vh] sm:h-full flex items-center justify-center sm:block"
                >
                    <div class="relative sm:block w-full">
                        <div
                            v-for="(n, i) in 4"
                            :key="i"
                            :ref="(el) => (advantageSlides[i] = el)"
                            class="flex items-center justify-center sm:justify-end px-6 h-full sm:h-screen"
                        >
                            <div class="max-w-md text-center sm:text-left">
                                <h2
                                    v-html="$t(`partner.frame_${n}.name`)"
                                    class="text-xl sm:text-3xl font-bold uppercase"
                                ></h2>
                                <p
                                    v-html="$t(`partner.frame_${n}.desc`)"
                                    class="uppercase"
                                ></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="relative h-[55vh] sm:h-screen flex items-center justify-center sm:justify-start sm:border-l sm:border-gray-300 sm:pl-[10%] bg-cover bg-center bg-no-repeat sm:bg-fixed sm:bg-[url(/img/bg_advantage.jpg)]"
                >
                    <div style="perspective: 1000px" class="transform-3d">
                        <img
                            ref="rotatingImage"
                            :src="advantageImages[0]"
                            class="w-60 xl:w-80 transform-3d rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>

        <section id="team" ref="feedbackSection" class="relative">
            <div
                class="sticky top-0 h-screen w-full overflow-hidden bg-primary"
            >
                <div class="absolute top-0 left-0 w-full h-screen flex z-5">
                    <div
                        ref="leftGate"
                        class="gate bg-cover bg-center bg-no-repeat bg-[url(/img/team/bg_team.jpg)] border-r border-gray-300 flex justify-center items-start"
                    >
                        <h1
                            v-html="$t('title.team.name')"
                            class="mt-[25%] text-3xl lg:text-4xl font-bold uppercase"
                        ></h1>
                    </div>
                    <div
                        ref="rightGate"
                        class="gate bg-white flex items-center justify-center border-l border-gray-300"
                    >
                        <div
                            class="flex flex-col items-center sm:items-start justify-center gap-3"
                        >
                            <div class="overflow-hidden">
                                <img
                                    src="/img/team/1.jpg"
                                    :alt="$t(`title.team.name`)"
                                    class="w-64 h-96 object-cover origin-center rounded-lg"
                                />
                            </div>
                            <div>
                                <p
                                    v-html="$t('title.team.desc')"
                                    class="text-sm uppercase"
                                ></p>
                            </div>
                            <div>
                                <a
                                    href="t.me/oystercomputer"
                                    target="_blank"
                                    class="group flex items-center justify-center p-2 w-44 h-10 rounded-full border border-black cursor-pointer hover:bg-black hover:text-white transition-colors duration-300 uppercase text-xs font-bold"
                                >
                                    {{ $t("text.lets_discuss") }}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    ref="feedbackNitro"
                    class="absolute top-0 left-0 w-full h-full py-8"
                >
                    <div class="section">
                        <div
                            class="flex flex-col items-center text-center mb-4"
                        >
                            <h2
                                class="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase z-0"
                            >
                                {{ $t("feedback.title1") }} <br />
                                {{ $t("feedback.title2") }}
                            </h2>
                            <p class="max-w-xl uppercase">
                                {{ $t("feedback.desc") }}
                            </p>
                        </div>
                        <Feedback id="feedback" />
                    </div>
                </div>
            </div>
        </section>

        <footer
            ref="footerSection"
            id="footerSection"
            class="relative bg-black text-white py-8 md:py-24 min-h-[45vh] max-h-screen w-full"
        >
            <div class="section">
                <div
                    class="grid grid-cols-1 md:grid-cols-3 items-end gap-8 text-sm"
                >
                    <div
                        class="flex justify-center md:justify-start items-center"
                    >
                        <div
                            class="flex flex-col gap-2 text-xs text-center md:text-left tracking-wider opacity-80"
                        >
                            <span>РУБЛЬ/ДОЛЛАР</span>
                            <span>ДИРХАМ/ДОЛЛАР</span>
                            <span>BTC/USDT</span>
                            <span>ETH/USDT</span>
                            <span>XAUT/USDT</span>
                        </div>
                    </div>

                    <div
                        class="flex flex-col gap-1 text-xs text-center opacity-80 uppercase tracking-wider"
                    >
                        <p>&copy; {{ new Date().getFullYear() }}</p>
                        <p>Oyster Computer.</p>
                        <p>All rights reserved.</p>
                    </div>

                    <div
                        class="flex flex-col items-center md:items-end gap-6 text-center md:text-right"
                    >
                        <a
                            href="t.me/oystercomputer"
                            target="_blank"
                            class="flex items-center justify-center p-2 w-44 rounded-full border border-white hover:bg-black hover:text-white transition-colors duration-300 uppercase text-xs"
                        >
                            {{ $t("text.write_to_us") }}
                        </a>
                        <div
                            class="flex flex-col gap-2 text-xs text-center md:text-right opacity-80 uppercase tracking-wider"
                        >
                            <a
                                href="#"
                                target="_blank"
                                class="uppercase text-xs"
                            >
                                {{ $t("text.consent_personal_data") }}
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                class="uppercase text-xs"
                            >
                                {{ $t("text.privacy_policy") }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

// Coordinates are [left, top, right, bottom] in the source illustration at 1140 px wide.
// Both the full-figure hit targets and the cropped step masks use this coordinate system.
// Fig. 4(c): keep the dashed blend ellipse and its caption together. The
// two displacement arrows meet the ellipse at its left and right edges.
const temporalBlend = [[209,621.5],[209,617],[210.5,612],[214,608],[219,604],
  [225,601.5],[232,600.8],[240,601],[247,603],[253.5,606],[257.5,610.5],
  [260,616],[260,621.2],[259,626],[256,630],[252,633],[249,634.5],
  [265,634.5],[265,655.5],[203,655.5],[203,635],[217,635],[213,631],[210.5,627]];
const methodFigures = {
  "f-teaser": {height:586, panels:[
    {box:[5,23,392,371], steps:[
      ["Store multi-resolution 3D Gaussians", [13,50,175,196],[55,196,198,228]], ["Select or Filtering", [176,47,380,197]],
      ["Storage inefficiency", [13,240,202,333],[13,333,216,363]],
      ["Temporal inconsistency", [203,240,382,333],[218,333,382,360]]]},
    {box:[394,23,686,371], steps:[
      ["4DGS model → render", [401,49,546,189]], ["2D Enhance model (SR / VFI)", [548,48,676,190]],
      ["Geometrical inconsistency", [401,201,679,293]], ["Real-time interaction", [401,294,679,364]]]},
    {box:[689,23,1135,371], steps:[
      ["Hybrid Implicit-Explicit 4DGS (Compact)", [728,250,796,332],[876,250,944,332],[1018,250,1087,332],[728,334,863,365]],
      ["Spatial Densification on Static Implicit Gaussians",
        // Both generated levels and their arrows, stopping left of the storage legend.
        [947,51,1013,228], [1013,93,1032,113], [1013,113,1041,182], [973,230,988,247],
        [1045,155,1107,172], [1018,172,1122,183], [1028,184,1115,195], [1044,195,1097,207],
        {outline:[[1007,261],[1015,255],[1022,249],[1026,244],[1028,237],[1025,235],
          [1027,230],[1025,230],[1018,212],[1026,212],[1026,202],[1024,194],
          [1020,190],[1018,191],[1012,186],[1019,182],[1020,185],[1025,189],
          [1029,195],[1031,204],[1030,212],[1040,212],[1035,231],[1032,231],
          [1035,236],[1032,237],[1031,243],[1028,248],[1023,254],[1010,264],[1007,264]]}],
      ["Temporal Relocation on Dynamic Explicit Gaussians", [753,185,938,249],[802,249,873,332]],
      ["On-demand test-time generation", [728,72,943,173]]]},
    {box:[5,373,1135,583], steps:[
      ["Training view and test view", [13,378,373,549],[13,549,355,578]], ["Dynamic Region", [387,376,752,549],[355,550,712,578]],
      ["Static Region", [757,376,1129,549],[727,549,1128,578]]]}
  ]},
  "f-overview": {height:628, panels:[
    {box:[3,1,362,314], steps:[
      ["Training videos", [15,31,142,126]], ["Image cues", [49,126,117,184],[79,184,87,187],
        [43.5,187.5,119.5,230],[32,231,130,244],[43.5,247.5,119.5,291],[27,292.5,134.5,305]], ["Initial region partition", [171,25,352,222],
        {outline:[[133,187],[142,187],[146,198],[146,225],[149,237],[153,237],
          [155,227],[155,120],[156,98],[159,92],[165,87],[168,83],[170,80],
          [182,87],[169,95],[167,92],[162,96],[160,103],[160,225],[157,238],
          [152,242],[148,245],[145,255],[145,277],[142,288],[137,294],
          [133,294],[133,289],[138,285],[140,276],[140,252],[143,242],
          [145,240],[141,234],[139,226],[139,202],[137,194],[133,192]]}],
      ["Warm-up correction", [171,224,352,304]]]},
    {box:[363,1,823,314], steps:[
      ["Dynamic: Explicit Gaussians", [376,31,812,155]], ["Static: Implicit Anchors", [428,159,769,179],[385,180,550,273],[383,275,519,294]],
      ["Gaussian decoder", [573,180,806,282],[652,282,752,298],{outline:[[520,281],[613,280],[641,272],[658,251],[667,237],[680,221],[681,228],[672,241],[663,257],[646,275],[618,285],[520,285]]}]]},
    {box:[824,1,1136,314], steps:[
      // The flame rises above the model title into the camera row.
      ["Training cameras", [835,33,1116,80],[835,80,1028,89],[1048,80,1116,89]],
      ["Hybrid 4DGS Model", [851,87,1107,161],[1028,80,1048,88]],
      ["Dynamic Explicit / Static Implicit Gaussians", [855,161,1110,238]], ["Render / GT", [869,242,1094,298]]]},
    {box:[3,316,576,625], steps:[
      ["Parent, anchor feature and neighborhood descriptor", [6,337,96,485],[96,352,203,473],[96,480,206,523]],
      ["Child Generator G", [202,348,364,397],
        {outline:[[216,396],[323,396],[305,410],[283,432],[276,446],[283,446],[286,440],[291,443],[294,446],[305,446],[293,503],[207,503],[220,446],[238,446],[235,432],[229,416]]}],
      ["Split probability and blending", [307,400,395,522],[395,340,569,533]],
      ["Where to split", [11,544,305,618]], ["How to split", [317,545,569,620],[461,535,565,546]]]},
    {box:[578,316,1137,625], steps:[
      ["Select Gaussians (vanishing or appearing)", [600,544,828,621.8]], ["Dense correspondences", [854,544,1018,618]],
      ["Temporal Relocator R",
        {outline:[[754.7,344.4],[752.9,342.5],[748.7,341.9],[749.3,345.6],[746.8,348.6],[745.0,348.0],[743.2,349.8],[742.0,354.1],[687.9,354.1],[678.2,392.3],[748.7,392.3],[755.3,362.6],[759.6,357.7],[759.0,352.3],[755.3,351.0]]},
        {outline:[[1037.9,387.5],[1033.0,385.1],[1028.8,391.1],[1027.0,390.5],[1023.9,396.6],[970.5,396.6],[961.3,434.3],[1030.6,434.9],[1038.5,405.1],[1041.6,401.5],[1041.6,395.4],[1037.9,393.0]]},
        [1026,544,1099,618]],
      ["Bidirectional relocation (Eq. 6)", [816,352,858,369],
        [615,404,650.5,451],
        [647,405.5,656.5,420.5],
        {outline:[[649.5,426],[723.5,413.5],[723.5,393.5],[775.5,393],[779,391],[794.5,391],[794.5,404.5],[815,400],[822,395.5],[822.5,409.5],[810.5,411.5],[649.5,435.5]]},
        [793.5,372,883.5,389.5],
        [817.5,386.5,859,416],
        [757,417,894,432.5],
        {outline:[[855,392],[1030.5,360],[1033.5,366],[865.5,398],[854.5,402]]},
        {outline:[[911.5,390.5],[946.5,381.5],[980.5,378],[981,393],[966.5,396],[956,401],[946,402.5],[911.5,405]]},
        [1032.5,344.5,1069,378],
        {outline:[[1035.5,377.5],[1076,377.5],[1076,393.5],[1042.5,393.5],[1039,389.5],[1035.5,385.5]]}],
      ["Opacity hand-over", [600,451,1112,521]]]}
  ]},
  "f-design": {height:347, panels:[
    {box:[4,1,574,239], steps:[
      ["Sparse, large Gaussians", [16,29,558,140]], ["Dense, small Gaussians", [16,142,558,238]]]},
    {box:[4,239,574,344], steps:[
      ["Far view", [16,255,117,335],[120,256,270,336]], ["Light feed-forward generator", [243,241,381,256],[268,256,355,300]],
      ["Near view and spatial detail", [307,302,350,332],[350,256,449,335],[450,254,551,335]]]},
    {box:[577,1,1137,239], steps:[
      ["Real motion (ideal fit)", [590,28,1129,140]], ["Naive fitting (overfitting to each training frame)", [590,142,1129,238]]]},
    {box:[577,239,1137,344], steps:[
      ["Test-Time Relocation", [683,240,855,336],[951,240,1127,336]],
      ["Smooth hand-over", [856,240,950,336]]]}
  ]},
  "f-control": {height:713, panels:[
    {box:[3,5,585,436],
     outline:[[3,5],[465,5],[465,131],[585,131],[585,185],[543,185],[543,221],[465,221],[465,372],[492,372],[492,424],[313,424],[313,436],[282,436],[282,386],[3,386]],
     steps:[
      ["Hybrid Implicit-Explicit 4DGS", [56,232,361,364]], ["Spatial and temporal LoD control", [158,74,257,197],[258,99.5,411,222],[198,196,219,231],
        [132,212,184,234],[235,212,286,234],[431,131,584,184],[480,190,540,220],
        [283,389,314,435],[322,375,490,425]]]},
    {box:[565,5,1136,556],
     outline:[[565,5],[1136,5],[1136,556],[565,556],[565,185],[584,185],[584,131],[565,131]],
     steps:[
      ["Spatial magnification", [581,69,1089,152],[1026,46,1071,71],[581,152,625,259],[647,152,1089,288]], ["Out-of-scope / Split / Keep", [582,338,638,374],[596,267,621,333],[650,288,1041,406],[1046,329,1096,376]],
      ["Continuous blending", [582,392,635,502],[645,427,1091,543],[1044,381,1119,427]]]},
    {box:[8,423,536,711],
     outline:[[8,423],[280,423],[280,439],[311,439],[311,428],[418,428],[418,431],[536,431],
       [536,711],[8,711]],
     steps:[
      ["Keep / Relocate", [31,473,175,541], [327,474,420,509], [330,511,470,541]],
      ["Temporal Relocator R and endpoint displacements", {box:[39,542,432,664], except:temporalBlend}],
      ["Blend at t", {outline:temporalBlend}, [225,680,243,700]]]},
    {box:[537,555.5,996,711],
     // Follow both incoming arrows from the branch boundaries to the output.
     outline:[[697,555.5],[713,555.5],[713,568.5],[722,568.5],[722,586],[996,586],[996,711],[658,711],
       [658,673],[646,685],[646,678],[537,678],[537,661],[646,661],
       [646,653],[658,665],[658,587],[688,587],[688,568.5],[697,568.5]],
     steps:[
      ["Spatio-temporal output", [658,587,754,709],[773,585,991,648],
        {outline:[[697,555.5],[713,555.5],[713,568.5],[722,568.5],[722,588],[688,588],[688,568.5],[697,568.5]]},
        {outline:[[537,661],[646,661],[646,653],[660,668],[660,671],[646,685],[646,678],[537,678]]}],
      ["Independent branch, run in any order", [773,650,993,707]]]}
  ]}
};

function initMethodFigure(panel, spec) {
  const surface = panel.querySelector(".figwrap");
  const image = surface.querySelector("img");
  const cards = [...panel.querySelectorAll(".mcard")];
  const figureRef = document.getElementById("tab-" + panel.id).querySelector(".fig-reference").textContent;
  const toolbar = document.createElement("div");
  toolbar.className = "figure-tools";
  toolbar.hidden = true;
  toolbar.innerHTML = '<div class="figure-actions"><strong></strong><button type="button" class="btn-mini restore">Show full figure</button></div><div class="figure-steps" role="group" aria-label="Walkthrough steps"></div>';
  surface.after(toolbar);
  const enlarge = panel.querySelector(".enlarge-figure");
  const dialog = document.getElementById("method-image-dialog");
  enlarge.onclick = () => {
    const large = dialog.querySelector("img");
    large.src = image.src;
    large.alt = image.alt;
    dialog.querySelector("h3").textContent = document.getElementById("tab-" + panel.id).textContent;
    dialog.showModal();
  };
  const steps = toolbar.querySelector(".figure-steps");
  const restore = toolbar.querySelector(".restore");
  const svgNS = "http://www.w3.org/2000/svg";
  function node(tag, attrs, parent) {
    const element = document.createElementNS(svgNS, tag);
    for (const [name, value] of Object.entries(attrs)) element.setAttribute(name, value);
    parent.append(element);
    return element;
  }
  function rect([left, top, right, bottom]) {
    return {x:left, y:top, width:right-left, height:bottom-top};
  }

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let zoomFrame;
  let timer;
  let svg;
  let selected = -1;
  let opener;
  function stop() {
    clearInterval(timer);
    timer = undefined;
  }
  function reset() {
    stop();
    cancelAnimationFrame(zoomFrame);
    surface.style.removeProperty("--view-ratio");
    svg?.remove();
    svg = undefined;
    selected = -1;
    surface.classList.remove("zoomed");
    toolbar.hidden = true;
    cards.forEach(card => card.setAttribute("aria-pressed", "false"));
  }
  function closeFigure() {
    reset();
    opener?.focus({preventScroll:true});
  }
  function selectPanel(index, trigger) {
    reset();
    selected = index;
    opener = trigger;
    const card = cards[index];
    const {box, outline, steps:sequence} = spec.panels[index];
    const bounds = rect(box);
    const title = card.querySelector(".card-title").textContent;
    const part = card.querySelector(".lab").textContent;
    const panelRef = part === "Output" ? figureRef + " · output" : figureRef + part;
    const prefix = panel.id + "-detail";
    surface.classList.add("zoomed");
    card.setAttribute("aria-pressed", "true");
    svg = node("svg", {viewBox:[bounds.x,bounds.y,bounds.width,bounds.height].join(" "), role:"img", "aria-label":title}, surface);
    const defs = node("defs", {}, svg);
    const source = node("image", {id:prefix, href:image.getAttribute("src"), x:0, y:0, width:1140, height:spec.height, preserveAspectRatio:"none"}, defs);
    const clip = node("clipPath", {id:prefix+"-bounds"}, defs);
    if (outline) node("polygon", {points:outline.map(point => point.join(",")).join(" ")}, clip);
    else node("rect", bounds, clip);
    surface.style.setProperty("--view-ratio", 1140 / spec.height);
    const group = node("g", {"clip-path":"url(#"+clip.id+")"}, svg);
    const base = node("use", {href:"#"+source.id, opacity:0.30}, group);
    const mask = node("clipPath", {id:prefix+"-step"}, defs);
    node("use", {href:"#"+source.id, "clip-path":"url(#"+mask.id+")"}, group);
    // The uncropped illustration stays visible throughout the camera move.
    const context = node("use", {href:"#"+source.id, "pointer-events":"none"}, svg);
    const focusRing = node("g", {fill:"none",stroke:"#9a572c","stroke-width":2,"pointer-events":"none"}, svg);
    if (outline) node("polygon", {points:outline.map(point => point.join(",")).join(" ")}, focusRing);
    else node("rect", {...bounds, rx:4}, focusRing);
    toolbar.querySelector("strong").textContent = panelRef + " · " + title;
    restore.setAttribute("aria-label", "Show full figure · " + figureRef);
    toolbar.hidden = false;
    steps.replaceChildren();
    const playback = document.createElement("button");
    playback.type = "button";
    let current = 0;
    function draw(step) {
      current = step;
      mask.replaceChildren();
      const complete = step === sequence.length;
      if (complete) stop();
      base.setAttribute("opacity", complete ? 1 : 0.30);
      if (!complete) {
        for (const area of sequence[step].slice(1)) {
          if (area.except) {
            const [l,t,r,b] = area.box;
            const hole = area.except.map(p => p.join(" ")).join(" L ");
            node("path", {d:`M ${l} ${t} H ${r} V ${b} H ${l} Z M ${hole} Z`, "clip-rule":"evenodd", "fill-rule":"evenodd"}, mask);
          } else if (area.outline) node("polygon", {points:area.outline.map(point => point.join(",")).join(" ")}, mask);
          else node("rect", rect(area), mask);
        }
      }
      stepButtons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === step)));
      playback.textContent = complete ? "Replay" : timer === undefined ? "Play" : "Pause";
    }
    const stepButtons = sequence.map(([label], i) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.onclick = () => { autoPlay = false; stop(); draw(i); };
      steps.append(button);
      return button;
    });
    function play() {
      timer = setInterval(() => draw(current + 1), 2000);
      draw(current === sequence.length ? 0 : current);
    }
    let autoPlay = !reducedMotion.matches;
    playback.onclick = () => {
      autoPlay = false;
      if (timer === undefined) play();
      else { stop(); draw(current); }
    };
    steps.append(playback);
    draw(0);
    const position = surface.getBoundingClientRect();
    if (position.top < 0 || position.top > innerHeight * 0.55) {
      surface.scrollIntoView({block:"start", behavior:"instant"});
    }
    if (trigger.classList.contains("fig-hit")) restore.focus({preventScroll:true});
    function showFrame(progress) {
      const width = 1140 + (bounds.width - 1140) * progress;
      const height = spec.height + (bounds.height - spec.height) * progress;
      svg.setAttribute("viewBox", [bounds.x*progress, bounds.y*progress, width, height].join(" "));
      surface.style.setProperty("--view-ratio", width / height);
      context.setAttribute("opacity", Math.min(1, (1-progress) * 4));
      focusRing.setAttribute("opacity", Math.min(.85, (1-progress) * 2));
    }
    if (reducedMotion.matches) {
      showFrame(1);
      context.remove();
      focusRing.remove();
      return;
    }
    const start = performance.now();
    showFrame(0);
    function zoom(now) {
      const t = Math.min(1, Math.max(0, (now-start)/800));
      showFrame(t*t*(3-2*t));
      if (t < 1) {
        zoomFrame = requestAnimationFrame(zoom);
      } else {
        context.remove();
        focusRing.remove();
        if (autoPlay && !document.hidden) play();
      }
    }
    zoomFrame = requestAnimationFrame(zoom);
  }
  spec.panels.forEach(({box, outline}, i) => {
    const hit = document.createElement("button");
    hit.type = "button";
    hit.className = "fig-hit";
    hit.setAttribute("aria-label", figureRef
      + " " + cards[i].querySelector(".lab").textContent + " · " + cards[i].querySelector(".card-title").textContent);
    const {x,y,width,height} = rect(box);
    Object.assign(hit.style, {left:100*x/1140+"%", top:100*y/spec.height+"%", width:100*width/1140+"%", height:100*height/spec.height+"%"});
    if (outline) {
      const points = outline.map(([px, py]) => (px-x)*100/width + "% " + (py-y)*100/height + "%");
      hit.style.clipPath = "polygon(" + points.join(", ") + ")";
    }
    surface.append(hit);
    hit.onclick = () => selectPanel(i, hit);
    const card = cards[i];
    card.onclick = () => selectPanel(i, card);
    card.onpointerenter = () => hit.classList.add("preview");
    card.onpointerleave = () => hit.classList.remove("preview");
  });
  restore.onclick = closeFigure;
  panel.addEventListener("keydown", event => {
    if (event.key === "Escape" && selected >= 0) closeFigure();
  });
  panel.addEventListener("leavefigure", reset);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && timer !== undefined) steps.lastElementChild.click();
  });
}
for (const [id, spec] of Object.entries(methodFigures)) initMethodFigure(document.getElementById(id), spec);

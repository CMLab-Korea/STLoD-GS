// Zoom relative to the training resolution, registered against the 30 fps comparison clips.
// Each pair is [frame, zoom]. Equal adjacent values hold through camera pans and slow motion.
const demoZoom = {
  skating:    [[0,1],[19,1],[59,4],[539,4],[579,1]],
  broomBench: [[0,1],[14,1],[54,5],[144,5],[184,1],[224,8],[314,8],[354,1],[384,3],[864,3],[894,1]],
  basketball: [[0,1],[14,1],[39,1.25],[79,2.5],[609,2.5],[645,1]],   // 1607 incl. the 90-frame pause at frame 150 (keys after it +90)
  broomSweep: [[0,1],[29,1],[74,2],[89,2],[134,4],[149,4],[194,8],[234,8],
               [284,1.5],[324,1.5],[379,4],[394,4],[434,8],[474,8],[524,1],[564,3],[1044,3],[1074,1]],
  truck:      [[-1,1],[23,2],[359,3],[389,1]],
  softball:   [[0,1],[23,1],[39,2],[247,2],[271,1]],  // 1704 path spec: x1 24 f, zoom-in 16 f, x2 208 f, zoom-out 24 f, x1 20 f
  pbasket:    [[0,1],[29,1],[45,2],[311,2],[335,1],[355,1]],  // 1710p (path a_basketball, |ds| <= 0.006) incl. the 90-frame pause at frame 110
  // 1623 and 1617: keys fitted to the PC9 camera paths (c23_corgi20_rt_slow_branches, c17_bike_z2.5), |ds| <= 0.006
  corgi:      [[0,1],[542,1],[547,1.036],[549,1.07],[552,1.142],[555,1.241],[556,1.28],[558,1.369],[559,1.419],[560,1.473],[561,1.53],[562,1.591],[564,1.726],[565,1.8],[566,1.879],[567,1.962],[569,2.142],[571,2.342],[572,2.45],[573,2.562],[574,2.679],[575,2.8],[576,2.927],[578,3.193],[579,3.333],[581,3.622],[583,3.922],[584,4.074],[585,4.228],[586,4.382],[587,4.535],[589,4.835],[590,4.98],[591,5.12],[592,5.254],[594,5.5],[595,5.609],[597,5.792],[599,5.923],[600,5.965],[601,5.991],[603,6],[782,6]],
  bike:       [[0,1],[20,1],[24,1.034],[26,1.065],[28,1.104],[32,1.202],[36,1.316],[37,1.346],[39,1.404],[40,1.432],[43,1.508],[47,1.572],[53,1.602],[56,1.641],[60,1.721],[61,1.746],[64,1.828],[65,1.858],[66,1.889],[68,1.954],[70,2.023],[73,2.128],[74,2.163],[164,2.163],[165,2.197],[166,2.231],[169,2.327],[170,2.356],[173,2.431],[176,2.482],[180,2.5],[300,2.5],[303,2.437],[305,2.365],[307,2.273],[309,2.167],[310,2.11],[312,1.991],[313,1.931],[314,1.871],[315,1.811],[316,1.752],[318,1.636],[319,1.581],[320,1.528],[321,1.476],[324,1.336],[325,1.295],[326,1.255],[329,1.154],[332,1.077],[334,1.04],[339,1]],   // 1617 incl. the 90-frame pause at source frame 74 (keys after it +90)
  playground: [[0,1],[203,1],[227,2],[395,2]],
  bartender:  [[0,1],[80,1],[99,2],[100,2],[139,3],[494,3],[533,1],[555,1]],   // 1627 incl. the 90-frame pause at frame 180
  // 1036 DyCheck paper-windmill spiral (monocular, s:1/4 -> 1): output grid 3x the s:1/4 training grid at m=1, path m up to 4/3 (PC9 path.json, per-frame keys in the zoom ramps)
  windmill:   [[0,3.0],[120,3.0],[121,3.003],[122,3.01],[123,3.023],[124,3.04],[125,3.062],[126,3.089],[127,3.121],[128,3.156],[129,3.195],[130,3.238],[131,3.284],[132,3.333],[133,3.384],[134,3.437],[135,3.491],[136,3.546],[137,3.6],[138,3.654],[139,3.706],[140,3.755],[141,3.802],[142,3.845],[143,3.884],[144,3.918],[145,3.947],[146,3.97],[147,3.987],[148,3.997],[149,4.0],[150,4.0],[390,4.0],[391,3.997],[392,3.987],[393,3.97],[394,3.947],[395,3.918],[396,3.884],[397,3.845],[398,3.802],[399,3.755],[400,3.706],[401,3.654],[402,3.6],[403,3.546],[404,3.491],[405,3.437],[406,3.384],[407,3.333],[408,3.284],[409,3.238],[410,3.195],[411,3.156],[412,3.121],[413,3.089],[414,3.062],[415,3.04],[416,3.023],[417,3.01],[418,3.003],[419,3.0],[420,3.0],[464,3.0]]
};

function spatialScaleAt(demo, mediaTime) {
  const frame = Math.round(mediaTime * 30);
  const keys = demo.zoom;
  for (let i = 1; i < keys.length; i++) {
    const [end, to] = keys[i];
    if (frame > end) continue;
    const [start, from] = keys[i-1];
    const u = Math.max(0, (frame-start)/(end-start));
    const eased = u*u*(3-2*u);
    return from * Math.pow(to/from, eased) / demo.s[0];
  }
  return keys[keys.length-1][1] / demo.s[0];
}

// First frame for each temporal magnification shown in the 30 fps player.
const demoSpeed = {
  skating: [[0,1],[20,8],[540,4],[580,1]],
  broomBench: [[0,1],[355,8],[865,4],[895,1]],   // 1605: spiral tours at real time, slow motion only on the legs
  basketball: [[0,1],[40,4],[80,8],[610,4]],   // 1607: pause at frame 150-240
  broomSweep: [[0,1],[525,8],[1045,4]],
  truck: [[0,8],[360,2],[390,1]],
  softball: [[0,1],[24,8],[248,4],[272,1]],
  pbasket: [[0,1],[30,8],[312,4],[336,1]],   // 1710p: pause at frame 110-200
  corgi: [[0,1],[75,8],[523,1]],
  bike: [[0,1],[20,2],[50,4],[180,8],[300,4]],   // 1617: pause at frame 74-164
  playground: [[0,1],[12,8]],
  bartender: [[0,1],[80,2],[100,4],[140,8],[494,4],[534,1]],
  windmill: [[0,1],[132,2],[140,4],[145,8],[420,1]]   // 1036: time frozen at frames 0-59 and 420-464 (shown as 1)
};

// The atlas uses the source video's 1920-pixel coordinate system and 42-pixel
// title band. Digits, fractions, arrows and punctuation share its math baseline.
const demoMath = new Image();
demoMath.src = "assets/demo-math.png?v=thirds";
function paintDemoFormula(canvas, demo, spatial, speed) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  let x = 0;
  function strip(left,row,width) {
    ctx.drawImage(demoMath,left,42*row,width,42,x,0,width,42);
    x += width;
  }
  function digits(text) {
    for (const ch of text) {
      if (ch === ".") strip(140,0,6);
      else strip(Number(ch)*14,0,12);
    }
  }
  const prefixRow = {1:1,2:2,3:5,4:3};
  strip(0,prefixRow[demo.s[0]],97);
  if (spatial === "1/3") strip(98,5,15);
  else if (spatial === "2/3") strip(114,5,15);
  else digits(spatial);
  strip(0,4,33); // comma and t
  strip(58,4,6); // colon
  strip(32,prefixRow[demo.t[0]],65); // training value and arrow
  digits(String(speed));
  strip(168,0,9);  // closing parenthesis
}

function followDemoFrame(video, demo, canvas, caption) {
  const events = new AbortController();
  const options = {signal:events.signal};
  const currentS = caption.querySelector(".current-s");
  const currentT = caption.querySelector(".current-t");
  let frameCallback;
  let painted = "";
  let lastSpatial;
  function update(mediaTime) {
    const scale = spatialScaleAt(demo, mediaTime);
    const third = demo.s[0] === 3 && (scale === 1/3 || scale === 2/3);
    const spatial = third ? Math.round(scale*3) + "/3" : String(Number(scale.toFixed(2)));
    const frame = Math.round(mediaTime*30);
    let speed = demo.speed[0][1];
    for (const [first, multiplier] of demo.speed) {
      if (first > frame) break;
      speed = multiplier;
    }
    if (lastSpatial !== spatial) {
      if (third) currentS.innerHTML = tgt(spatial);
      else currentS.textContent = spatial;
      lastSpatial = spatial;
    }
    if (currentT.textContent !== String(speed)) currentT.textContent = String(speed);
    const key = spatial + "/" + speed;
    if (key !== painted && demoMath.complete && demoMath.naturalWidth) {
      paintDemoFormula(canvas,demo,spatial,speed);
      canvas.hidden = false;
      painted = key;
    }
  }
  demoMath.addEventListener('load', () => update(video.currentTime), options);
  function presented(_, metadata) {
    update(metadata.mediaTime);
    frameCallback = video.requestVideoFrameCallback(presented);
  }
  video.addEventListener('loadeddata', () => update(video.currentTime), options);
  if (video.requestVideoFrameCallback) {
    frameCallback = video.requestVideoFrameCallback(presented);
  } else {
    video.addEventListener('seeked', () => update(video.currentTime), options);
    video.addEventListener('timeupdate', () => update(video.currentTime), options);
  }
  update(0);
  return () => {
    events.abort();
    if (frameCallback !== undefined) video.cancelVideoFrameCallback(frameCallback);
    video.pause();
  };
}

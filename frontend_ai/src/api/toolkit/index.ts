import { request } from "../service";

export const processor = {
  generate: (title: string, type: string, data: any) => {
    return request<any>({
      url: "/aigc/generate",
      method: "post",
      data: {
        title: title||"以文生图",
        type,
        data
      }
    });
  },
  cancel: (id: string) => {
    return request<any>({
      url: "/aigc/cancel",
      method: "post",
      data: {
        id
      }
    });
  },
  MJfetch: (id: string, mjid: string) => {
    return request<any>({
      url: "/aigc/fetch_mj?id=" + id + "&mjid=" + mjid,
      method: "get",
    });
  },
}

export const zhCN = {
  model: "模型",
  modelMJ: "生图模式",
  modelFLUXflux1s: "flux1s",
  modelFLUXflux1d: "flux1d",
  modelFLUXflux1p: "flux1p",
  modelMJturbo: "极速模式",
  modelMJturboDesc: "比快更快，60秒内出图",
  modelMJfast: "快速模式",
  modelMJfastDesc: "节省等待时间，90秒内出图（推荐）",
  modelMJrelax: "低速模式",
  modelMJrelaxDesc: " 节省费用，大约5分钟内出图（不推荐）",
  modelV2: "高质低速",
  modelV2Desc: "生成高质量图片，生成速度较慢",
  modelV2TURBO: "低质高速",
  modelV2TURBODesc: "快速生成一张图片，图片质量可能较低",
  modelNIJIJOURNEY: "二次元模型",
  modelNIJIJOURNEYDesc: "使用二次元模型生成动漫风格的图片",
  modelMIDJOURNEY: " 通用模型",
  modelMIDJOURNEYDesc: "使用通用模型生成图片",
  magic_prompt_option: "魔法补全提词",
  magicAUTO: "自动",
  magicAUTODesc: "由AI判断是否自动补全提词",
  magicON: "开启",
  magicONDesc: "开启自动补全提词，例如：在提示词中输入“猫”，自动补全为“一个可爱的猫咪”等",
  magicOFF: "关闭",
  magicOFFDesc: "关闭自动补全提词",
  aspect_ratio: "宽高比",
  ratioASPECT11: "1:1",
  ratioASPECT11Desc: "如: 300x300 800x800",
  ratioASPECT169: "16:9",
  ratioASPECT169Desc: "如: 400x225 1280x720",
  ratioASPECT43: "4:3",
  ratioASPECT43Desc: "如: 320x240 640x480",
  prompt: "提词",
  style_type: "风格",
  styleGENERAL: "通用",
  styleGENERALDesc: "由AI根据提词判断",
  styleANIME: "动漫风",
  styleANIMEDesc: "生成动漫风格的图片",
  styleRENDER3D: "3D效果",
  styleRENDER3DDesc: "生成带有3D立体感受的图片",
  styleREALISTIC: "真实感",
  styleREALISTICDesc: "生成真实画风的图片",
  styleDESIGN: "设计风",
  styleDESIGNDesc: "生成设计感较为强烈的图片",
  negative_prompt: "反向提词",
  seed: "种子",
  redstyle:"风格提词器",
  redcamera: "镜头提词器",
  redlight: "灯光提词器",
  redangle: "视角提词器",
  redelement: "元素提词器",
  redwords: "词汇大全",
  "MJupsample1":"放大图一",
  "MJupsample2":"放大图二",
  "MJupsample3":"放大图三",
  "MJupsample4":"放大图四",
  "MJreroll":"整张重绘",
  "MJvariation1":"重绘图一",
  "MJvariation2":"重绘图二",
  "MJvariation3":"重绘图三",
  "MJvariation4":"重绘图四",
  "MJCustom Zoom":"自定义放大",
  "MJupscale_subtle":"精细型扩展",
  "MJredo_upscale_subtle":"再次进行-精细型扩展",
  "MJupscale_creative":"创作型扩展",
  "MJredo_upscale_creative":"再次进行-创作型扩展",
  "MJlow_variation":"小幅变化",
  "MJhigh_variation":"大幅变化",
  "MJvary_region":"区域",
  "MJzoom_out_2":"2倍缩小图像",
  "MJzoom_out_1_5":"1.5倍缩小图像",
  "MJpan_left":"向左平移扩展",
  "MJpan_right":"向右平移扩展",
  "MJpan_up":"向上平移扩展",
  "MJpan_down":"向下平移扩展",
  "MJmake_square":"正方形",
}
export const enUS = {
  model: "Model",
  modelFLUX1S: "flux1s",
  modelFLUX1SDesc: "flux1s",
  modelFLUX1D: "flux1d",
  modelFLUX1DDesc: "flux1s",
  modelFLUX1P: "flux1p",
  modelFLUX1PDesc: "flux1s",
  modelMJTurbo: "turbo",
  modelMJTurboDesc: "the turbo mode, fastest",
  modelMJFast: "fast",
  modelMJFastDesc: "fast speed mode",
  modelMJRelax: "relax",
  modelMJRelaxDesc: "low speed mode, low cost",
  modelV2: "Quality&Slow",
  modelV2Desc: "Generate high quality images but slowly",
  modelV2TURBO: "Qucikly&LowQuality",
  modelV2TURBODesc: "Generate low quality images quickly",
  magic_prompt_option: "Magic Prompt Option",
  magicAUTO: "Auto",
  magicAUTODesc: "Determined by AI",
  magicON: "On",
  magicONDesc: `Enable automatic completion of prompts, such as entering  in the prompt and automatically completing it as "a cute cat", etc`,
  magicOFF: "Off",
  magicOFFDesc: "Close automatic completion of prompts",
  aspect_ratio: "Aspect Ratio",
  ratioASPECT11: "1:1",
  ratioASPECT11Desc: "example size: 300x300 800x800",
  ratioASPECT169: "16:9",
  ratioASPECT169Desc: "example size: 400x225 1280x720",
  ratioASPECT43: "4:3",
  ratioASPECT43Desc: "example size: 320x240 640x480",
  prompt: "Prompt",
  style_type: "Style Type",
  styleGENERAL: "General",
  styleGENERALDesc: "Generate images with general style",
  styleANIME: "Anime",
  styleANIMEDesc: "Generate images with anime style",
  styleRENDER3D: "Render3D",
  styleRENDER3DDesc: "Generate images with render3d style",
  styleREALISTIC: "Realistic",
  styleREALISTICDesc: "Generate images with realistic style",
  styleDESIGN: "Design",
  styleDESIGNDesc: "Generate images with strong design elements",
  negative_prompt: "Negative Prompt",
  redstyle:"style piker",
  redcamera: "camera piker",
  redlight: "light piker",
  redangle: "angle piker",
  redelement: "element piker",
  redwords: "words piker",
  "MJupsample1":"upsample1",
  "MJupsample2":"upsample2",
  "MJupsample3":"upsample3",
  "MJupsample4":"upsample4",
  "MJreroll":"reroll",
  "MJvariation1":"variation1",
  "MJvariation2":"variation2",
  "MJvariation3":"variation3",
  "MJvariation4":"variation4",
  "MJupscale_subtle":"精细型扩展",
  "MJredo_upscale_subtle":"再次进行-精细型扩展",
  "MJupscale_creative":"创作型扩展",
  "MJredo_upscale_creative":"再次进行-创作型扩展",
  "MJlow_variation":"小幅变化",
  "MJhigh_variation":"大幅变化",
  "MJvary_region":"区域",
  "MJzoom_out_2":"2倍缩小图像",
  "MJzoom_out_1_5":"1.5倍缩小图像",
  "MJpan_left":"向左平移扩展",
  "MJpan_right":"向右平移扩展",
  "MJpan_up":"向上平移扩展",
  "MJpan_down":"向下平移扩展",
  "MJmake_square":"正方形",
}

export const interiorStyle = ()=>{
  
}

export const promptRecommendStyles = [
  {
    "zhCN_name": "中国传统水墨古画",
    "enUS_name": "Tradition Chinese Ink Painting",
    "zhCN_description": "利用墨水和水在华丽的纸张上创造出不同深度和纹理的线条和形状。它通常使用黑色和白色，但也可以使用其他颜色来增强作品的视觉效果。",
    "enUS_description": "Uses ink and water to create lines and shapes with different depths and textures on beautiful paper. It typically employs black and white but can also use other colors to enhance the visual effect."
  },
  {
    "zhCN_name": "日本浮世绘",
    "enUS_name": "Japanese Ukiyo-e",
    "zhCN_description": "呈现出色彩的饱和度高、线条的清晰度高、题材多样化的特点",
    "enUS_description": "Features high color saturation, clear lines, and a variety of themes."
  },
  {
    "zhCN_name": "日本漫画风格",
    "enUS_name": "Japanese comics/manga",
    "zhCN_description": "日本漫画可能会呈现出角色造型、表情和动作的表现",
    "enUS_description": "Japanese manga may present character designs, expressions, and actions."
  },
  {
    "zhCN_name": "股票插画风格",
    "enUS_name": "stock illustration style",
    "zhCN_description": "日本漫画可能会呈现出角色造型、表情和动作的表现",
    "enUS_description": "May present character designs, expressions, and actions similar to Japanese manga."
  },
  {
    "zhCN_name": "CGSociety",
    "enUS_name": "CGSociety",
    "zhCN_description": "偏3D些，整体有西部魔幻风。",
    "enUS_description": "Leans towards 3D with an overall western fantasy vibe."
  },
  {
    "zhCN_name": "梦工厂动画",
    "enUS_name": "DreamWorks Animation",
    "zhCN_description": "偏少女色调",
    "enUS_description": "Leans towards a youthful color palette."
  },
  {
    "zhCN_name": "皮克斯动画制作公司",
    "enUS_name": "Pixar",
    "zhCN_description": "画风就是稳定，就是玩具总动员这种画风",
    "enUS_description": "Features a stable style similar to Toy Story."
  },
  {
    "zhCN_name": "日本平面设计海报",
    "enUS_name": "a poster in the style of japanese graphic design",
    "zhCN_description": "简约的几何色块的组合",
    "enUS_description": "A combination of minimalist geometric color blocks."
  },
  {
    "zhCN_name": "90年代电视游戏",
    "enUS_name": "90s video game",
    "zhCN_description": "像素游戏或伪3D",
    "enUS_description": "Pixel art games or pseudo-3D."
  },
  {
    "zhCN_name": "包豪斯",
    "enUS_name": "Bauhaus",
    "zhCN_description": "呈现出简单、几何、功能性强的特点，以及使用基本的形状和颜色",
    "enUS_description": "Features simplicity, geometry, and strong functionality, using basic shapes and colors."
  },
  {
    "zhCN_name": "手稿",
    "enUS_name": "manuscript",
    "zhCN_description": "低饱和、泛黄的历史感，和偏文艺复兴的艺术形式",
    "enUS_description": "Low saturation, yellowed historical feel, with a Renaissance art style."
  },
  {
    "zhCN_name": "像素艺术",
    "enUS_name": "Pixel Art",
    "zhCN_description": "很正确的像素风",
    "enUS_description": "Authentically pixelated art style."
  },
  {
    "zhCN_name": "深色复古",
    "enUS_name": "retro dark vintage",
    "zhCN_description": "类似于苏联二战时期的海报风格，以深色为主。",
    "enUS_description": "Similar to Soviet WWII poster styles, primarily dark in color."
  },
  {
    "zhCN_name": "复古",
    "enUS_name": "Vintage",
    "zhCN_description": "包含那个年代的历史",
    "enUS_description": "Incorporates the history of that era."
  },
  {
    "zhCN_name": "黑色电影",
    "enUS_name": "Pulp Noir",
    "zhCN_description": "大衣元素偏多",
    "enUS_description": "Features a lot of trench coat elements."
  },
  {
    "zhCN_name": "乡村风格",
    "enUS_name": "Country style",
    "zhCN_description": "偏西部乡村独栋房屋",
    "enUS_description": "Leans towards western country-style detached houses."
  },
  {
    "zhCN_name": "抽象风",
    "enUS_name": "Abstract",
    "zhCN_description": "没有可识别的物体或人物，强调使用线条和色彩来创造纯粹的视觉体验",
    "enUS_description": "No recognizable objects or figures, emphasizing lines and colors for pure visual experience."
  },
  {
    "zhCN_name": "酸性平面",
    "enUS_name": "Acid Graphic",
    "zhCN_description": "它不是人们了解的酸性设计，这反而是一种奇怪的新艺术风格，它和抽象主义很像",
    "enUS_description": "Not the acid design people know; it's a strange new art style similar to abstractism."
  },
  {
    "zhCN_name": "笔墨渲染",
    "enUS_name": "Rendering in Pen and Ink",
    "zhCN_description": "通过细致的线条描绘阴影和纹理来创造高度详细和真实的视觉效果。",
    "enUS_description": "Creates highly detailed and realistic visuals through intricate lines depicting shadows and textures."
  },
  {
    "zhCN_name": "种族艺术",
    "enUS_name": "Ethnic art",
    "zhCN_description": "色彩运用大胆、鲜艳",
    "enUS_description": "Bold and vivid color usage."
  },
  {
    "zhCN_name": "概念艺术",
    "enUS_name": "concept art",
    "zhCN_description": "在设计上它会包含些凌乱的草稿辅助线，在风景上会是壮丽震撼的场景",
    "enUS_description": "Includes messy draft lines in design, with stunning and magnificent landscapes."
  },
  {
    "zhCN_name": "虚幻引擎",
    "enUS_name": "unreal engine",
    "zhCN_description": "广袤的景色，非写实3D",
    "enUS_description": "Expansive landscapes, non-realistic 3D."
  },
  {
    "zhCN_name": "哥特式阴郁",
    "enUS_name": "Gothic gloomy",
    "zhCN_description": "黑暗、压抑、神秘的氛围",
    "enUS_description": "Dark, oppressive, and mysterious atmosphere."
  },
  {
    "zhCN_name": "现实主义",
    "enUS_name": "realism",
    "zhCN_description": "现实主义的风格可能会呈现出真实而细腻的画面",
    "enUS_description": "Realistic style that may present genuine and delicate imagery."
  },
  {
    "zhCN_name": "黑和白",
    "enUS_name": "black and white",
    "zhCN_description": "黑白",
    "enUS_description": "Black and white."
  },
  {
    "zhCN_name": "巴洛克式",
    "enUS_name": "Baroque",
    "zhCN_description": "呈现出宏伟、繁复和华丽的装饰",
    "enUS_description": "Features grand, intricate, and lavish decorations."
  },
  {
    "zhCN_name": "印象派",
    "enUS_name": "Impressionism",
    "zhCN_description": "呈现出明亮的色彩和明显的笔触",
    "enUS_description": "Displays bright colors and distinct brush strokes."
  },
  {
    "zhCN_name": "新艺术",
    "enUS_name": "Art Nouveau",
    "zhCN_description": "呈现出流畅的线条和曲线，以及华丽的装饰和细节，以表现出自然的优雅和流动感。",
    "enUS_description": "Features smooth lines and curves, with lavish decorations and details to express natural elegance and flow."
  },
  {
    "zhCN_name": "装饰风艺术",
    "enUS_name": "Art Deco",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "zhCN_name": "洛可可",
    "enUS_name": "Rococo",
    "zhCN_description": "呈现出轻盈、优雅和浪漫的主题，以及鲜艳的颜色和华丽的装饰，以表现出宫廷文化的华丽和奢华。",
    "enUS_description": "Features light, elegant, and romantic themes with vibrant colors and opulent decorations, reflecting court culture's grandeur."
  },
  {
    "zhCN_name": "文艺复兴",
    "enUS_name": "Renaissance",
    "zhCN_description": "文艺复兴的风格可能会呈现出比例精准、透视表现和细致的细节。",
    "enUS_description": "Renaissance style may exhibit precise proportions, perspective representation, and intricate details."
  },
  {
    "zhCN_name": "野兽派",
    "enUS_name": "Fauvism",
    "zhCN_description": "呈现出鲜艳和直接的颜色，强调笔触和表现力",
    "enUS_description": "Features bright and direct colors, emphasizing brush strokes and expressiveness."
  },
  {
    "zhCN_name": "立体主义",
    "enUS_name": "Cubism",
    "zhCN_description": "主要为三原色块组成。呈现出几何形状的组合和分解，以及不同角度的绘画，强调几何形状和线条的重要性。",
    "enUS_description": "Composed mainly of primary color blocks. Presents combinations and decompositions of geometric shapes, emphasizing the importance of geometry and lines."
  },
  {
    "zhCN_name": "超现实主义",
    "enUS_name": "Surrealism",
    "zhCN_description": "超现实主义可能会呈现出各种各样的奇怪和不寻常的图像，例如人类和动物的混合体、不自然的比例和几何形状",
    "enUS_description": "Surrealism may present a variety of strange and unusual images, such as hybrids of humans and animals, unnatural proportions, and geometric shapes."
  },
  {
    "zhCN_name": "光学艺术 / 视幻艺术",
    "enUS_name": "OP Art / Optical Art",
    "zhCN_description": "错综复杂的线条和形状，以及视觉上的幻觉和变化。这种艺术形式通常使用鲜艳的颜色和强烈的对比来增强视觉效果。",
    "enUS_description": "Intricate lines and shapes, with visual illusions and changes. This art form often uses bright colors and strong contrasts to enhance visual effects."
  },
  {
    "zhCN_name": "维多利亚时代",
    "enUS_name": "Victorian",
    "zhCN_description": "维多利亚时代的艺术风格可能会呈现出大量的装饰性元素、曲线和细节，强调精致和华丽。它可能会与浪漫主义艺术和其他19世纪艺术风格类似或有相似之处。",
    "enUS_description": "Victorian art style may feature numerous decorative elements, curves, and details, emphasizing delicacy and grandeur. It may resemble Romanticism and other 19th-century art styles."
  },
  {
    "zhCN_name": "未来派",
    "enUS_name": "Neo-futurism",
    "zhCN_description": "未来主义可能会呈现出类似于科幻电影中的虚拟世界的图像，有时会有激光、发光和其他科技元素。",
    "enUS_description": "Futurism may present images resembling virtual worlds in sci-fi films, sometimes featuring lasers, glowing elements, and other technological aspects."
  },
  {
    "zhCN_name": "极简主义",
    "enUS_name": "Minimalist",
    "zhCN_description": "呈现出简洁的线条和几何形状",
    "enUS_description": "Features clean lines and geometric shapes."
  },
  {
    "zhCN_name": "野蛮主义",
    "enUS_name": "brutalist",
    "zhCN_description": "通常为混凝土建筑的粗犷外表，单体统一。它可能类似于苏联时期的建筑和现代主义建筑风格",
    "enUS_description": "Typically has a rugged appearance of concrete architecture, unified in form. It may resemble Soviet-era and modernist architectural styles."
  },
  {
    "zhCN_name": "建构主义",
    "enUS_name": "Constructivist",
    "zhCN_description": "简单的几何形状和明亮的颜色来构建建筑",
    "enUS_description": "Constructs architecture with simple geometric shapes and bright colors."
  },
  {
    "zhCN_name": "新海诚",
    "enUS_name": "Makoto Shinkai",
    "zhCN_description": "会体现壮丽的风景，与新海诚特有的艺术画风，细腻的光影关系。",
    "enUS_description": "Features magnificent landscapes with Makoto Shinkai's unique artistic style and intricate light and shadow relations."
  },
  {
    "zhCN_name": "山田章博",
    "enUS_name": "Yamada Akihiro",
    "zhCN_description": "图像会是日本早期动画的马克笔手绘风。",
    "enUS_description": "Images reflect the marker-drawn style of early Japanese animation."
  },
  {
    "zhCN_name": "吉卜力工作室",
    "enUS_name": "Studio Ghibli",
    "zhCN_description": "它的动画风格有时被描述为清新又朴实的，与日本传统绘画的柔和风格相似。",
    "enUS_description": "Its animation style is sometimes described as fresh and simple, resembling the soft style of traditional Japanese painting."
  },
  {
    "zhCN_name": "彩色玻璃窗",
    "enUS_name": "Stained glass window",
    "zhCN_description": "因为它通常用于装饰建筑物的窗户。它可能与其他玻璃艺术形式（如吹制玻璃艺术或玻璃雕塑）有些相似，但它通常更注重颜色和组合效果。",
    "enUS_description": "Typically used to decorate windows of buildings, it may resemble other glass art forms but focuses more on color and composition."
  },
  {
    "zhCN_name": "墨水插图",
    "enUS_name": "ink illustration",
    "zhCN_description": "它可能与传统的中国水墨画有些相似，但也可以是现代的风格，具有流畅的线条和现代的主题。",
    "enUS_description": "May resemble traditional Chinese ink painting but can also be modern, featuring smooth lines and contemporary themes."
  },
  {
    "zhCN_name": "抽象霓虹艺术",
    "enUS_name": "abstract neon art",
    "zhCN_description": "根据主体生成蓝绿色与紫红色的强烈视角冲击",
    "enUS_description": "Generates strong visual impact in teal and magenta based on the subject."
  },
  {
    "zhCN_name": "多米尼克·梅耶",
    "enUS_name": "Dominik Mayer",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "zhCN_name": "六七质",
    "enUS_name": "Munashichi",
    "zhCN_description": "水彩画",
    "enUS_description": "Watercolor painting."
  },
  {
    "zhCN_name": "水彩儿童插画",
    "enUS_name": "watercolor children's book illustrations",
    "zhCN_description": "它的AI图像生成效果可能因输入的原始数据而异，但通常会尝试模仿这种风格。它可能与童话故事书的插图相似。",
    "enUS_description": "The AI-generated effect may vary based on original input data but typically attempts to mimic this style, resembling illustrations from fairy tale books."
  },
  {
    "zhCN_name": "多边形风格艺术",
    "enUS_name": "polygon style art",
    "zhCN_description": "一种抽象的艺术形式，它使用平面的多边形来表现物体和场景，通常使用明亮的颜色和鲜明的对比。",
    "enUS_description": "An abstract art form using flat polygons to represent objects and scenes, often utilizing bright colors and stark contrasts."
  },
  {
    "zhCN_name": "钢笔淡彩画",
    "enUS_name": "Pen and wash Painting",
    "zhCN_description": "与水彩相似，但它比水彩更加有轮有阔",
    "enUS_description": "Similar to watercolor but with more defined outlines."
  },
  {
    "zhCN_name": "后现代主义建筑",
    "enUS_name": "Postmodern architecture",
    "zhCN_description": "不安规矩去展现建筑就是它的特点",
    "enUS_description": "Characterized by breaking conventional rules in architecture."
  }
]

export const promptRecommendCameras = [
  {
    "enUS_name": "Detail Shot (ECU)",
    "zhCN_name": "大特写",
    "zhCN_description": "非常近，只凸显细部",
    "enUS_description": "Very close, highlighting details."
  },
  {
    "enUS_name": "Face Shot (VCU)",
    "zhCN_name": "脸部特写",
    "zhCN_description": "从额头中间到下巴的脸部",
    "enUS_description": "The face from the middle of the forehead to the chin."
  },
  {
    "enUS_name": "Big Close-Up (BCU)",
    "zhCN_name": "头部以上",
    "zhCN_description": "整个头部，包含脸部",
    "enUS_description": "The entire head, including the face."
  },
  {
    "enUS_name": "Close-Up (CU)",
    "zhCN_name": "颈部以上",
    "zhCN_description": "整个头部，包含局部",
    "enUS_description": "The entire head, including details."
  },
  {
    "enUS_name": "Chest Shot (MCU)",
    "zhCN_name": "胸部以上",
    "zhCN_description": "从头部到胸部下方",
    "enUS_description": "From the head down to below the chest."
  },
  {
    "enUS_name": "Waist Shot (WS)",
    "zhCN_name": "腰部以上",
    "zhCN_description": "头部到腰部以上的上半身",
    "enUS_description": "Upper body from the head to above the waist."
  },
  {
    "enUS_name": "Knee Shot (KS)",
    "zhCN_name": "膝盖以上",
    "zhCN_description": "头部到膝盖以上",
    "enUS_description": "From the head to above the knees."
  },
  {
    "enUS_name": "Full Length Shot (FLS)",
    "zhCN_name": "全身",
    "zhCN_description": "全身并且头上脚下各留空间",
    "enUS_description": "Full body with space above the head and below the feet."
  },
  {
    "enUS_name": "Close-Up (CU)",
    "zhCN_name": "特写",
    "zhCN_description": "景物主体的局部细节",
    "enUS_description": "Close details of the subject."
  },
  {
    "enUS_name": "Medium Close-Up (MCU)",
    "zhCN_name": "近景",
    "zhCN_description": "景物主体的1/4左右",
    "enUS_description": "About 1/4 of the subject."
  },
  {
    "enUS_name": "Medium Shot (MS)",
    "zhCN_name": "中景",
    "zhCN_description": "景物主体的1/2左右",
    "enUS_description": "About 1/2 of the subject."
  },
  {
    "enUS_name": "Panorama Shot (PS)",
    "zhCN_name": "全景",
    "zhCN_description": "景物主体的全部加点天地",
    "enUS_description": "The entire subject with some sky and ground."
  },
  {
    "enUS_name": "Long Shot (LS)",
    "zhCN_name": "远景",
    "zhCN_description": "景物主体约占镜头的3/4到1/3",
    "enUS_description": "Subject occupies about 3/4 to 1/3 of the frame."
  },
  {
    "enUS_name": "Extra Long Shot (ELS)",
    "zhCN_name": "大远景",
    "zhCN_description": "比远景更远",
    "enUS_description": "Further than a long shot."
  },
  {
    "enUS_name": "Dolly IN/Out (Track In/Out)",
    "zhCN_name": "推",
    "zhCN_description": "摄影机的脚架装有轮子，可以往任意方向推动",
    "enUS_description": "Camera on wheels can be pushed in any direction."
  },
  {
    "enUS_name": "Dolly IN/Out (Track In/Out)",
    "zhCN_name": "移",
    "zhCN_description": "摄影机镜头往右/左移",
    "enUS_description": "Camera lens moves right/left."
  },
  {
    "enUS_name": "Ped Up/Down",
    "zhCN_name": "移",
    "zhCN_description": "摇推摄影机往上/下移",
    "enUS_description": "Camera moves up/down."
  },
  {
    "enUS_name": "Tilt Up/Down",
    "zhCN_name": "移",
    "zhCN_description": "摄影机镜头往上/下摇",
    "enUS_description": "Camera tilts up/down."
  },
  {
    "enUS_name": "Track Right/Left (Crab Right/Left)",
    "zhCN_name": "推",
    "zhCN_description": "摄影机往右/左推",
    "enUS_description": "Camera pushes right/left."
  },
  {
    "enUS_name": "Zoom In/Out",
    "zhCN_name": "拉",
    "zhCN_description": "摄影机不动，变换镜头，主題在特写范围内外变化",
    "enUS_description": "Camera remains still while changing the lens, zooming in/out on the subject."
  },
  {
    "enUS_name": "Isometric Projection",
    "zhCN_name": "45度角俯视",
    "zhCN_description": "这种视角的俯角不是45°而是约35.264°，视点和XY轴夹角相等并且忽略近大远小透视，三根坐标轴在视平面上的投影互成120°夹角。这种视角下的正方体露出的三个面是全等的菱形。",
    "enUS_description": "This angle is approximately 35.264°, where the view point and XY axis form equal angles, ignoring perspective distortion. The projections of the three axes on the plane form 120° angles."
  }
]
export const promptRecommendLights = [{
  enUS_name: 'volumetric lighting',
  zhCN_name: '立体照明',
  zhCN_description: '',
  enUS_description: ''
}, {
  enUS_name: 'bright',
  zhCN_name: '明亮灯',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'Soft illumination',
  zhCN_name: '柔和灯光',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'natural light',
  zhCN_name: '自然光',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'rays of shimmering light',
  zhCN_name: '闪烁的光纤线',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'bioluminescence',
  zhCN_name: '生物发光',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'bisexual lighting',
  zhCN_name: '双性光',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'Rembrandt Lighting',
  zhCN_name: '伦勃朗光',
  zhCN_description: '人物的45度角侧向光,俗称三角光，伦勃朗光，常见于肖像攝影',
  enUS_description: 'The 45 degree lateral light of a character, commonly known as triangular light or Rembrandt light, is commonly used in portrait photography'
},
{
  enUS_name: 'Split Lighting',
  zhCN_name: '分裂光',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'front lighting',
  zhCN_name: '正面光顺光',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'Back lighting',
  zhCN_name: '后背光',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'clean background trending lighting',
  zhCN_name: '斜逆光',
  zhCN_description: '',
  enUS_description: ''
},
{
  enUS_name: 'volume light',
  zhCN_name: '体积光',
  zhCN_description: '例如，从窗户外面投射的高对比度光',
  enUS_description: 'For example, high contrast light projected from outside'
},{
  enUS_name: "rim lights",
  zhCN_name: "轮廓灯",
  zhCN_description: "",
  enUS_description: ""
},
{
  enUS_name: "Warming lighting",
  zhCN_name: "暖光",
  zhCN_description: "",
  enUS_description: ""
}]
export const promptRecommendAngles = [
  {
    "enUS_name": "Top view",
    "zhCN_name": "鸟瞰",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Tilt-shift",
    "zhCN_name": "顶视",
    "zhCN_description": "移轴效果",
    "enUS_description": "Tilt-shift effect."
  },
  {
    "enUS_name": "Satellite view",
    "zhCN_name": "仰视",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Bottom view",
    "zhCN_name": "底视",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Front, side, rear view",
    "zhCN_name": "前侧后视图",
    "zhCN_description": "产品视角",
    "enUS_description": "Product perspective."
  },
  {
    "enUS_name": "Closeup view",
    "zhCN_name": "特写镜头",
    "zhCN_description": "适用于在近物摄影上",
    "enUS_description": "Suitable for close-up photography."
  },
  {
    "enUS_name": "Outer space view",
    "zhCN_name": "太空视角",
    "zhCN_description": "适用于一些太空场景或空拍",
    "enUS_description": "Suitable for some space scenes or aerial shots."
  },
  {
    "enUS_name": "First-person view",
    "zhCN_name": "第一人称视角",
    "zhCN_description": "适用于战争场景",
    "enUS_description": "Suitable for war scenes."
  },
  {
    "enUS_name": "Isometric view",
    "zhCN_name": "等距视图",
    "zhCN_description": "适用于微缩模型",
    "enUS_description": "Suitable for miniature models."
  },
  {
    "enUS_name": "Close up",
    "zhCN_name": "特写",
    "zhCN_description": "适用于自拍视角",
    "enUS_description": "Suitable for selfie perspective."
  },
  {
    "enUS_name": "High angle view",
    "zhCN_name": "高角度视图",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Microscopic view",
    "zhCN_name": "微视图",
    "zhCN_description": "适用于观察细胞或生物",
    "enUS_description": "Suitable for observing cells or organisms."
  },
  {
    "enUS_name": "Tilt-shift",
    "zhCN_name": "移轴特效",
    "zhCN_description": "适用于微缩模型",
    "enUS_description": "Suitable for miniature models."
  },
  {
    "enUS_name": "Super side angle",
    "zhCN_name": "超侧角",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Aerial view",
    "zhCN_name": "第三人称视角",
    "zhCN_description": "也是鸟瞰",
    "enUS_description": "Also a bird's eye view."
  },
  {
    "enUS_name": "Three views, multiple views, front view, side view, back view",
    "zhCN_name": "两点透视",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Two-point perspective",
    "zhCN_name": "两点透视",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Three-point perspective",
    "zhCN_name": "三点透视",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Elevation view",
    "zhCN_name": "立面视角",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Ultra-Wide Angle",
    "zhCN_name": "超广角",
    "zhCN_description": "",
    "enUS_description": ""
  }
]
export const promptRecommendElements = [
  {
    "enUS_name": "Cyborgs",
    "zhCN_name": "机械构造",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mechanical structure",
    "zhCN_name": "机械结构",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mechanical power armor",
    "zhCN_name": "机械动力装甲",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Biotech",
    "zhCN_name": "生化科技",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mobile Suit",
    "zhCN_name": "机动战士/机动士兵",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Sci-fi glass door",
    "zhCN_name": "科技玻璃门",
    "zhCN_description": "电路",
    "enUS_description": ""
  },
  {
    "enUS_name": "Massive sci-fi spaceship",
    "zhCN_name": "超大型宇宙飞船",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mayan sculpture",
    "zhCN_name": "玛雅雕塑",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Utopia",
    "zhCN_name": "乌托邦",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Villain",
    "zhCN_name": "恶棍",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Puppeteer",
    "zhCN_name": "操纵木偶的人,操纵傀儡",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Zodiac Signs",
    "zhCN_name": "黄道十二宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Western Astrology",
    "zhCN_name": "西洋占星术",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Horoscope",
    "zhCN_name": "天宫图",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Aries, ♈︎",
    "zhCN_name": "牧羊宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Taurus, ♉︎",
    "zhCN_name": "金牛宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Gemini, ♊︎",
    "zhCN_name": "双子宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Cancer, ♋︎",
    "zhCN_name": "巨蟹宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Leo, ♌︎",
    "zhCN_name": "狮子宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Virgo, ♍︎",
    "zhCN_name": "处女宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Libra, ♎︎",
    "zhCN_name": "天秤宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Scorpio, ♏︎",
    "zhCN_name": "天蝎宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Sagittarius, ♐︎",
    "zhCN_name": "射手宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Capricornus, ♑︎",
    "zhCN_name": "魔羯宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Aquarius, ♒︎",
    "zhCN_name": "宝瓶宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Pisces, ♓︎",
    "zhCN_name": "双鱼宫",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Ophiuchi",
    "zhCN_name": "蛇夫座",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Galaxy",
    "zhCN_name": "银河系",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Sun / Solar / Helios / Sol",
    "zhCN_name": "太阳",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Moon / Luna",
    "zhCN_name": "月亮",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mercurius / Mercury",
    "zhCN_name": "水星",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Venus",
    "zhCN_name": "金星",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Earth / eorðe / Terra / αῖα / Gaia",
    "zhCN_name": "地球",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mars / Ares",
    "zhCN_name": "火星",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Jupiter / Iuppiter / Iūpiter",
    "zhCN_name": "木星",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Saturn",
    "zhCN_name": "土星",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Uranus",
    "zhCN_name": "天王星",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Neptunus",
    "zhCN_name": "海王星",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Pluto",
    "zhCN_name": "冥王星",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Zeus",
    "zhCN_name": "宙斯 / 朱比特",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Hera",
    "zhCN_name": "希拉 / 朱诺",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Poseidon",
    "zhCN_name": "波赛顿 / 涅普顿",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Hades",
    "zhCN_name": "黑帝斯 / 普鲁托",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Demeter",
    "zhCN_name": "狄密特 / 刻瑞斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Athena",
    "zhCN_name": "雅典娜 / 密涅瓦",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Apollo",
    "zhCN_name": "阿波罗",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Artemis",
    "zhCN_name": "阿提密斯 / 黛安娜",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Ares",
    "zhCN_name": "阿瑞斯 / 玛尔斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Aphrodite",
    "zhCN_name": "阿弗罗黛蒂 / 维纳斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Hephaestus",
    "zhCN_name": "赫非斯托斯 / 伏尔坎",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Hermes",
    "zhCN_name": "荷米斯 / 墨丘利",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Hestia",
    "zhCN_name": "荷丝提雅 / 维斯塔",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Dionysus",
    "zhCN_name": "狄俄倪索斯 / 巴克斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Persephone",
    "zhCN_name": "珀瑟芬妮",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Heracles",
    "zhCN_name": "海克力斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Asclepius",
    "zhCN_name": "阿斯克勒庇俄斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Pan",
    "zhCN_name": "潘",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Circe",
    "zhCN_name": "喀耳刻",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Hypnos",
    "zhCN_name": "许普诺斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Nemesis",
    "zhCN_name": "涅墨西斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Thanatos",
    "zhCN_name": "塔纳托斯",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Selene",
    "zhCN_name": "赛勒涅",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Iuppiter",
    "zhCN_name": "雷神  众神统治者",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Juno",
    "zhCN_name": "众神之后 婚神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Neptunus",
    "zhCN_name": "海神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Pluto",
    "zhCN_name": "冥界神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Ceres",
    "zhCN_name": "农业神  谷神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Minerva",
    "zhCN_name": "智慧女神 战争女神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Diana",
    "zhCN_name": "月亮女神 狩猎女神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mars",
    "zhCN_name": "战神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Venus",
    "zhCN_name": "爱与美的女神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Vulcan",
    "zhCN_name": "火神 工匠神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mercury",
    "zhCN_name": "商业神 信使神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Vesta",
    "zhCN_name": "灶神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Bacchus",
    "zhCN_name": "酒神  狂欢神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "",
    "zhCN_name": "冥界之母",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "",
    "zhCN_name": "半神英雄",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "",
    "zhCN_name": "医神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "",
    "zhCN_name": "牧神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "",
    "zhCN_name": "某个女神 (女巫的代表?)",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "",
    "zhCN_name": "睡神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "",
    "zhCN_name": "复仇女神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "Mors",
    "zhCN_name": "死神",
    "zhCN_description": "",
    "enUS_description": ""
  },
  {
    "enUS_name": "",
    "zhCN_name": "月神",
    "zhCN_description": "",
    "enUS_description": ""
  }
]
export const promptRecommendWords = []
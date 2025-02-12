const models = [
    {
        id: "aa6b8e8e73a54e8bbadd64daa31604eb",
        name: "change-materia",
        title: "一键更换材质",
        cost: 20000,
        cost_type: "amount",
        cover: "/disk/workflow/5ab2ecadb218ab594dc1b5958471b72e81d0d5412bdd083a4fa0a274084f17e8.webp",
        demo_images: [
            "/disk/workflow/18fc9bb2ca6034d60f6ecef8a2c5e6ac07f9d218fa84e492940dd2ebc591a167.webp",
            "/disk/workflow/c03a4b599e2464f31434f105b8fa575761055caee16ba67f0d901ddbbe2f7302.webp",
            "/disk/workflow/79627075a93a08818ff8a64f7b7b67b768f561db2d3e502c82380e676f8d1cf6.webp"
        ],
        descript: `🎉 全新材质革命 🌈

🌟 一键式材质变换 —— 释放您的创意潜能！无论是电商产品、家具设计、室内装饰还是建筑外观，我们都能帮您轻松实现材质的无缝转换。

🛠️ 简单三步走：

选择材质：上传您心仪的材质图片。
定位物品：选择需要更换材质的原始图片。
点击变换：一键操作，见证奇迹发生！

📱 智能识别技术 —— 我们的先进算法能够精确识别并应用新材质，无需繁琐的手动调整。

🔍 细节至上 —— 我们注重每一处细节，确保材质替换自然、真实，让最终效果栩栩如生。

🏠 多场景适用 —— 无论是家庭装修、商业空间设计，还是在线产品展示，我们的解决方案都能完美适应。

📸 前后对比展示 —— 我们提供直观的前后效果对比，让您一目了然地看到材质变换带来的惊人变化。

🚀 立即体验 —— 加入我们，探索材质变换的无限可能，让您的设计作品脱颖而出！`,
        build_params: (imageUrlA: string, imageUrlB: string, id: string = "8cfa4ba4aec7485b8d4701be815c4b66", prompt: string = "sofa", mask_name: string = "xxx") => {
            return {
                "source": 0,
                "generateType": 19,
                "taskQueuePriority": 2,
                "frontCustomerReq": {
                    "tabType": "comfy",
                    "conAndSegAndGen": "gen"
                },
                "comfyUI": {
                    "prompt": {
                        "5": {
                            "inputs": {
                                "x": [
                                    "48",
                                    3
                                ],
                                "y": [
                                    "48",
                                    2
                                ],
                                "resize_source": false,
                                "destination": [
                                    "130",
                                    0
                                ],
                                "source": [
                                    "116",
                                    0
                                ],
                                "mask": [
                                    "130",
                                    1
                                ]
                            },
                            "class_type": "ImageCompositeMasked"
                        },
                        "15": {
                            "inputs": {
                                "ckpt_name": 1127394
                            },
                            "class_type": "CheckpointLoaderSimple"
                        },
                        "16": {
                            "inputs": {
                                "seed": 314097080599992,
                                "steps": 5,
                                "cfg": 2,
                                "sampler_name": "dpmpp_sde_gpu",
                                "scheduler": "karras",
                                "denoise": 1,
                                "model": [
                                    "61",
                                    0
                                ],
                                "positive": [
                                    "21",
                                    0
                                ],
                                "negative": [
                                    "21",
                                    1
                                ],
                                "latent_image": [
                                    "20",
                                    2
                                ]
                            },
                            "class_type": "KSampler"
                        },
                        "17": {
                            "inputs": {
                                "samples": [
                                    "16",
                                    0
                                ],
                                "vae": [
                                    "15",
                                    2
                                ]
                            },
                            "class_type": "VAEDecode"
                        },
                        "18": {
                            "inputs": {
                                "text": [
                                    "100",
                                    0
                                ],
                                "clip": [
                                    "15",
                                    1
                                ]
                            },
                            "class_type": "CLIPTextEncode"
                        },
                        "19": {
                            "inputs": {
                                "text": "blur, text, watermark, CGI, Unreal, Airbrushed, Digital ",
                                "clip": [
                                    "15",
                                    1
                                ]
                            },
                            "class_type": "CLIPTextEncode"
                        },
                        "20": {
                            "inputs": {
                                "positive": [
                                    "18",
                                    0
                                ],
                                "negative": [
                                    "19",
                                    0
                                ],
                                "vae": [
                                    "15",
                                    2
                                ],
                                "pixels": [
                                    "94",
                                    0
                                ],
                                "mask": [
                                    "35",
                                    0
                                ]
                            },
                            "class_type": "InpaintModelConditioning"
                        },
                        "21": {
                            "inputs": {
                                "strength": 1,
                                "start_percent": 0,
                                "end_percent": 1,
                                "positive": [
                                    "20",
                                    0
                                ],
                                "negative": [
                                    "20",
                                    1
                                ],
                                "control_net": [
                                    "22",
                                    0
                                ],
                                "image": [
                                    "111",
                                    0
                                ],
                                "model_optional": [
                                    "15",
                                    0
                                ]
                            },
                            "class_type": "ACN_AdvancedControlNetApply"
                        },
                        "22": {
                            "inputs": {
                                "control_net_name": "sai_xl_depth_256lora"
                            },
                            "class_type": "ControlNetLoaderAdvanced"
                        },
                        "35": {
                            "inputs": {
                                "amount": 20,
                                "device": "auto",
                                "mask": [
                                    "160",
                                    0
                                ]
                            },
                            "class_type": "MaskBlur+"
                        },
                        "37": {
                            "inputs": {
                                "weight": 0.85,
                                "weight_type": "strong style transfer",
                                "combine_embeds": "concat",
                                "start_at": 0,
                                "end_at": 1,
                                "embeds_scaling": "V only",
                                "model": [
                                    "21",
                                    2
                                ],
                                "ipadapter": [
                                    "40",
                                    0
                                ],
                                "image": [
                                    "77",
                                    0
                                ],
                                "attn_mask": [
                                    "35",
                                    0
                                ],
                                "clip_vision": [
                                    "41",
                                    0
                                ]
                            },
                            "class_type": "IPAdapterAdvanced"
                        },
                        "40": {
                            "inputs": {
                                "ipadapter_file": "ip-adapter_sdxl_vit-h"
                            },
                            "class_type": "IPAdapterModelLoader"
                        },
                        "41": {
                            "inputs": {
                                "clip_name": "CLIP-ViT-H-14-laion2B-s32B-b79K"
                            },
                            "class_type": "CLIPVisionLoader"
                        },
                        "48": {
                            "inputs": {
                                "padding": 50,
                                "region_type": "dominant",
                                "mask": [
                                    "152",
                                    1
                                ]
                            },
                            "class_type": "Mask Crop Region"
                        },
                        "52": {
                            "inputs": {
                                "width": [
                                    "48",
                                    6
                                ],
                                "height": [
                                    "48",
                                    7
                                ],
                                "position": "top-left",
                                "x_offset": [
                                    "48",
                                    3
                                ],
                                "y_offset": [
                                    "48",
                                    2
                                ],
                                "image": [
                                    "201",
                                    0
                                ]
                            },
                            "class_type": "ImageCrop+"
                        },
                        "54": {
                            "inputs": {
                                "mask": [
                                    "48",
                                    0
                                ]
                            },
                            "class_type": "MaskToImage"
                        },
                        "56": {
                            "inputs": {
                                "channel": "red",
                                "image": [
                                    "96",
                                    0
                                ]
                            },
                            "class_type": "ImageToMask"
                        },
                        "61": {
                            "inputs": {
                                "model": [
                                    "37",
                                    0
                                ]
                            },
                            "class_type": "DifferentialDiffusion"
                        },
                        "66": {
                            "inputs": {
                                "image": "$66-0",
                                "block": false,
                                "images": [
                                    "17",
                                    0
                                ]
                            },
                            "class_type": "PreviewBridge"
                        },
                        "67": {
                            "inputs": {
                                "mask1": [
                                    "79",
                                    0
                                ],
                                "mask2": [
                                    "90",
                                    1
                                ]
                            },
                            "class_type": "SubtractMask"
                        },
                        "68": {
                            "inputs": {
                                "mask": [
                                    "71",
                                    0
                                ]
                            },
                            "class_type": "MaskPreview+"
                        },
                        "71": {
                            "inputs": {
                                "amount": 2.6,
                                "device": "auto",
                                "mask": [
                                    "123",
                                    0
                                ]
                            },
                            "class_type": "MaskBlur+"
                        },
                        "72": {
                            "inputs": {
                                "model_name": "GroundingDINO_SwinT_OGC (694MB)"
                            },
                            "class_type": "GroundingDinoModelLoader (segment anything)"
                        },
                        "73": {
                            "inputs": {
                                "prompt": prompt,
                                "threshold": 0.25,
                                "sam_model": [
                                    "74",
                                    0
                                ],
                                "grounding_dino_model": [
                                    "72",
                                    0
                                ],
                                "image": [
                                    "17",
                                    0
                                ]
                            },
                            "class_type": "GroundingDinoSAMSegment (segment anything)"
                        },
                        "74": {
                            "inputs": {
                                "model_name": "sam_vit_h_4b8939.pth"
                            },
                            "class_type": "SAMModelLoader (segment anything)"
                        },
                        "77": {
                            "inputs": {
                                "interpolation": "LANCZOS",
                                "crop_position": "left",
                                "sharpening": 0.15,
                                "image": [
                                    "202",
                                    0
                                ]
                            },
                            "class_type": "PrepImageForClipVision"
                        },
                        "79": {
                            "inputs": {
                                "mask1": [
                                    "170",
                                    0
                                ],
                                "mask2": [
                                    "66",
                                    1
                                ]
                            },
                            "class_type": "AddMask"
                        },
                        "84": {
                            "inputs": {
                                "text": "photo of xxx yyy high quality",
                                "find": "xxx",
                                "replace": "sofa"
                            },
                            "class_type": "Text Find and Replace"
                        },
                        "86": {
                            "inputs": {
                                "value": 1,
                                "width": [
                                    "48",
                                    6
                                ],
                                "height": [
                                    "48",
                                    7
                                ]
                            },
                            "class_type": "SolidMask"
                        },
                        "90": {
                            "inputs": {
                                "image": "$90-0",
                                "block": false,
                                "images": [
                                    "17",
                                    0
                                ]
                            },
                            "class_type": "PreviewBridge"
                        },
                        "94": {
                            "inputs": {
                                "width": 1024,
                                "height": 1024,
                                "interpolation": "lanczos",
                                "method": "keep proportion",
                                "condition": "always",
                                "multiple_of": 0,
                                "image": [
                                    "52",
                                    0
                                ]
                            },
                            "class_type": "ImageResize+"
                        },
                        "96": {
                            "inputs": {
                                "width": 1024,
                                "height": 1024,
                                "interpolation": "lanczos",
                                "method": "keep proportion",
                                "condition": "upscale if smaller",
                                "multiple_of": 0,
                                "image": [
                                    "54",
                                    0
                                ]
                            },
                            "class_type": "ImageResize+"
                        },
                        "97": {
                            "inputs": {
                                "image": [
                                    "52",
                                    0
                                ]
                            },
                            "class_type": "ImageSizeAndBatchSize"
                        },
                        "100": {
                            "inputs": {
                                "text": [
                                    "84",
                                    0
                                ],
                                "find": "yyy",
                                "replace": ""
                            },
                            "class_type": "Text Find and Replace"
                        },
                        "111": {
                            "inputs": {
                                "ckpt_name": "depth_anything_vitl14.pth",
                                "resolution": 512,
                                "image": [
                                    "52",
                                    0
                                ]
                            },
                            "class_type": "DepthAnythingPreprocessor"
                        },
                        "116": {
                            "inputs": {
                                "width": [
                                    "97",
                                    0
                                ],
                                "height": [
                                    "97",
                                    1
                                ],
                                "interpolation": "lanczos",
                                "method": "keep proportion",
                                "condition": "always",
                                "multiple_of": 0,
                                "image": [
                                    "66",
                                    0
                                ]
                            },
                            "class_type": "ImageResize+"
                        },
                        "123": {
                            "inputs": {
                                "dilation": 4,
                                "mask": [
                                    "67",
                                    0
                                ]
                            },
                            "class_type": "ImpactDilateMask"
                        },
                        "130": {
                            "inputs": {
                                "select": 1,
                                "images1": [
                                    "201",
                                    0
                                ],
                                "mask1_opt": [
                                    "71",
                                    0
                                ],
                                "images2_opt": [
                                    "201",
                                    0
                                ],
                                "mask2_opt": [
                                    "86",
                                    0
                                ]
                            },
                            "class_type": "ImageMaskSwitch"
                        },
                        "140": {
                            "inputs": {
                                "text": [
                                    "100",
                                    0
                                ],
                                "text2": "photo of chair  high quality"
                            },
                            "class_type": "ShowText|pysssss"
                        },
                        "151": {
                            "inputs": {
                                "model_name": "GroundingDINO_SwinT_OGC (694MB)"
                            },
                            "class_type": "GroundingDinoModelLoader (segment anything)"
                        },
                        "152": {
                            "inputs": {
                                "prompt": "sofa",
                                "threshold": 0.25,
                                "sam_model": [
                                    "153",
                                    0
                                ],
                                "grounding_dino_model": [
                                    "151",
                                    0
                                ],
                                "image": [
                                    "201",
                                    0
                                ]
                            },
                            "class_type": "GroundingDinoSAMSegment (segment anything)"
                        },
                        "153": {
                            "inputs": {
                                "model_name": "sam_vit_h_4b8939.pth"
                            },
                            "class_type": "SAMModelLoader (segment anything)"
                        },
                        "156": {
                            "inputs": {
                                "expand": 2,
                                "tapered_corners": true,
                                "mask": [
                                    "158",
                                    0
                                ]
                            },
                            "class_type": "GrowMask"
                        },
                        "158": {
                            "inputs": {
                                "masks": [
                                    "56",
                                    0
                                ]
                            },
                            "class_type": "Mask Fill Holes"
                        },
                        "160": {
                            "inputs": {
                                "left": 5,
                                "top": 5,
                                "right": 5,
                                "bottom": 5,
                                "mask": [
                                    "156",
                                    0
                                ]
                            },
                            "class_type": "FeatherMask"
                        },
                        "170": {
                            "inputs": {
                                "masks": [
                                    "73",
                                    1
                                ]
                            },
                            "class_type": "Mask Fill Holes"
                        },
                        "173": {
                            "inputs": {
                                "filename_prefix": "ComfyUI",
                                "images": [
                                    "5",
                                    0
                                ]
                            },
                            "class_type": "SaveImage"
                        },
                        "198": {
                            "inputs": {
                                "sam_model": "sam_vit_h_4b8939.pth",
                                "grounding_dino_model": "GroundingDINO_SwinT_OGC (694MB)",
                                "threshold": 0.3,
                                "detail_method": "VITMatte",
                                "detail_erode": 6,
                                "detail_dilate": 6,
                                "black_point": 0.15,
                                "white_point": 0.99,
                                "process_detail": true,
                                "prompt": "subject",
                                "device": "cuda",
                                "max_megapixels": 2
                            },
                            "class_type": "LayerMask: SegmentAnythingUltra V2"
                        },
                        "201": {
                            "inputs": {
                                "image": [
                                    "203",
                                    0
                                ],
                                "keep_alpha_channel": false,
                                "output_mode": false,
                                "choose image to upload": "image"
                            },
                            "class_type": "LoadImageFromUrl"
                        },
                        "202": {
                            "inputs": {
                                "image": [
                                    "204",
                                    0
                                ],
                                "keep_alpha_channel": false,
                                "output_mode": false,
                                "choose image to upload": "image"
                            },
                            "class_type": "LoadImageFromUrl"
                        },
                        "203": {
                            "inputs": {
                                "string": imageUrlA
                            },
                            "class_type": "Simple String"
                        },
                        "204": {
                            "inputs": {
                                "string": imageUrlB
                            },
                            "class_type": "Simple String"
                        }
                    },
                    "extra_data": {
                        "extra_pnginfo": {
                            "workflow": {
                                "last_node_id": 204,
                                "last_link_id": 572,
                                "nodes": [
                                    {
                                        "id": 116,
                                        "type": "ImageResize+",
                                        "pos": {
                                            "0": 2218.052490234375,
                                            "1": 2111.91845703125
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 218
                                        },
                                        "flags": {},
                                        "order": 44,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 409,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "width",
                                                "type": "INT",
                                                "link": 411,
                                                "widget": {
                                                    "name": "width"
                                                },
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height",
                                                "type": "INT",
                                                "link": 412,
                                                "widget": {
                                                    "name": "height"
                                                },
                                                "label": "高度"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    410
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "width",
                                                "type": "INT",
                                                "links": [],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height",
                                                "type": "INT",
                                                "links": [],
                                                "slot_index": 2,
                                                "shape": 3,
                                                "label": "高度"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageResize+"
                                        },
                                        "widgets_values": [
                                            1024,
                                            1024,
                                            "lanczos",
                                            "keep proportion",
                                            "always",
                                            0
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 153,
                                        "type": "SAMModelLoader (segment anything)",
                                        "pos": {
                                            "0": -1178.864990234375,
                                            "1": 1622.2861328125
                                        },
                                        "size": {
                                            "0": 351.2849426269531,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 0,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "SAM_MODEL",
                                                "type": "SAM_MODEL",
                                                "links": [
                                                    496
                                                ],
                                                "shape": 3,
                                                "label": "SAM模型"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "SAMModelLoader (segment anything)"
                                        },
                                        "widgets_values": [
                                            "sam_vit_h_4b8939.pth"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 54,
                                        "type": "MaskToImage",
                                        "pos": {
                                            "0": -772.4590454101562,
                                            "1": 1794.9677734375
                                        },
                                        "size": {
                                            "0": 312.157470703125,
                                            "1": 26
                                        },
                                        "flags": {},
                                        "order": 22,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 122,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    333
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "MaskToImage"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 156,
                                        "type": "GrowMask",
                                        "pos": {
                                            "0": -452.45904541015625,
                                            "1": 2034.9677734375
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 82
                                        },
                                        "flags": {},
                                        "order": 31,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 510,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    514
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "GrowMask"
                                        },
                                        "widgets_values": [
                                            2,
                                            true
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 160,
                                        "type": "FeatherMask",
                                        "pos": {
                                            "0": -452.45904541015625,
                                            "1": 2144.9677734375
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 130
                                        },
                                        "flags": {},
                                        "order": 32,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 514,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    515
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "FeatherMask"
                                        },
                                        "widgets_values": [
                                            5,
                                            5,
                                            5,
                                            5
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 22,
                                        "type": "ControlNetLoaderAdvanced",
                                        "pos": {
                                            "0": 706.3056640625,
                                            "1": 1858.15673828125
                                        },
                                        "size": {
                                            "0": 355.9349365234375,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 1,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "tk_optional",
                                                "type": "TIMESTEP_KEYFRAME",
                                                "link": null,
                                                "label": "帧间隔",
                                                "shape": 7
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONTROL_NET",
                                                "type": "CONTROL_NET",
                                                "links": [
                                                    49
                                                ],
                                                "shape": 3,
                                                "label": "ControlNet"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ControlNetLoaderAdvanced"
                                        },
                                        "widgets_values": [
                                            "sai_xl_depth_256lora"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 111,
                                        "type": "DepthAnythingPreprocessor",
                                        "pos": {
                                            "0": 709.3056640625,
                                            "1": 1947.15673828125
                                        },
                                        "size": {
                                            "0": 361.5025634765625,
                                            "1": 82
                                        },
                                        "flags": {},
                                        "order": 28,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 386,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    387
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "DepthAnythingPreprocessor"
                                        },
                                        "widgets_values": [
                                            "depth_anything_vitl14.pth",
                                            512
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 41,
                                        "type": "CLIPVisionLoader",
                                        "pos": {
                                            "0": 342.0740661621094,
                                            "1": 1857.4315185546875
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 2,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "CLIP_VISION",
                                                "type": "CLIP_VISION",
                                                "links": [
                                                    94
                                                ],
                                                "shape": 3,
                                                "label": "CLIP视觉"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CLIPVisionLoader"
                                        },
                                        "widgets_values": [
                                            "CLIP-ViT-H-14-laion2B-s32B-b79K"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 40,
                                        "type": "IPAdapterModelLoader",
                                        "pos": {
                                            "0": 342.0740661621094,
                                            "1": 1947.4315185546875
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 3,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "IPADAPTER",
                                                "type": "IPADAPTER",
                                                "links": [
                                                    93
                                                ],
                                                "shape": 3,
                                                "label": "IPAdapter"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "IPAdapterModelLoader"
                                        },
                                        "widgets_values": [
                                            "ip-adapter_sdxl_vit-h"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 20,
                                        "type": "InpaintModelConditioning",
                                        "pos": {
                                            "0": 1130.4637451171875,
                                            "1": 1927.3509521484375
                                        },
                                        "size": {
                                            "0": 306.6081237792969,
                                            "1": 106
                                        },
                                        "flags": {},
                                        "order": 34,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "link": 40,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "link": 41,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 38,
                                                "label": "VAE"
                                            },
                                            {
                                                "name": "pixels",
                                                "type": "IMAGE",
                                                "link": 374,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 375,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    45
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    46
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "latent",
                                                "type": "LATENT",
                                                "links": [
                                                    389
                                                ],
                                                "slot_index": 2,
                                                "shape": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "InpaintModelConditioning"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 61,
                                        "type": "DifferentialDiffusion",
                                        "pos": {
                                            "0": 1130.4637451171875,
                                            "1": 2057.35107421875
                                        },
                                        "size": {
                                            "0": 312.26275634765625,
                                            "1": 35.80995559692383
                                        },
                                        "flags": {},
                                        "order": 37,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 466,
                                                "label": "模型"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [
                                                    512
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "DifferentialDiffusion"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 16,
                                        "type": "KSampler",
                                        "pos": {
                                            "0": 1120.4637451171875,
                                            "1": 1557.3509521484375
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 262
                                        },
                                        "flags": {},
                                        "order": 38,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 512,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "link": 47,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "link": 48,
                                                "slot_index": 2,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "latent_image",
                                                "type": "LATENT",
                                                "link": 389,
                                                "label": "Latent"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "LATENT",
                                                "type": "LATENT",
                                                "links": [
                                                    34
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "KSampler"
                                        },
                                        "widgets_values": [
                                            314097080599992,
                                            "randomize",
                                            5,
                                            2,
                                            "dpmpp_sde_gpu",
                                            "karras",
                                            1
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 74,
                                        "type": "SAMModelLoader (segment anything)",
                                        "pos": {
                                            "0": 1491.1693115234375,
                                            "1": 1617.4427490234375
                                        },
                                        "size": {
                                            "0": 356.4834289550781,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 4,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "SAM_MODEL",
                                                "type": "SAM_MODEL",
                                                "links": [
                                                    233
                                                ],
                                                "shape": 3,
                                                "label": "SAM模型"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "SAMModelLoader (segment anything)"
                                        },
                                        "widgets_values": [
                                            "sam_vit_h_4b8939.pth"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 72,
                                        "type": "GroundingDinoModelLoader (segment anything)",
                                        "pos": {
                                            "0": 1491.1693115234375,
                                            "1": 1527.4427490234375
                                        },
                                        "size": {
                                            "0": 361.20001220703125,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 5,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "GROUNDING_DINO_MODEL",
                                                "type": "GROUNDING_DINO_MODEL",
                                                "links": [
                                                    232
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "G-Dino模型"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "GroundingDinoModelLoader (segment anything)"
                                        },
                                        "widgets_values": [
                                            "GroundingDINO_SwinT_OGC (694MB)"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 86,
                                        "type": "SolidMask",
                                        "pos": {
                                            "0": 2218.052490234375,
                                            "1": 1751.91845703125
                                        },
                                        "size": {
                                            "0": 304.53179931640625,
                                            "1": 102.44869995117188
                                        },
                                        "flags": {
                                            "collapsed": false
                                        },
                                        "order": 24,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "width",
                                                "type": "INT",
                                                "link": 398,
                                                "widget": {
                                                    "name": "width"
                                                },
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height",
                                                "type": "INT",
                                                "link": 397,
                                                "widget": {
                                                    "name": "height"
                                                },
                                                "label": "高度"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    462
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "SolidMask"
                                        },
                                        "widgets_values": [
                                            1,
                                            512,
                                            512
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 48,
                                        "type": "Mask Crop Region",
                                        "pos": {
                                            "0": -772.4590454101562,
                                            "1": 1534.9677734375
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 222
                                        },
                                        "flags": {},
                                        "order": 21,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 501,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "cropped_mask",
                                                "type": "MASK",
                                                "links": [
                                                    122
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            },
                                            {
                                                "name": "crop_data",
                                                "type": "CROP_DATA",
                                                "links": [],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "裁剪数据"
                                            },
                                            {
                                                "name": "top_int",
                                                "type": "INT",
                                                "links": [
                                                    192,
                                                    195
                                                ],
                                                "slot_index": 2,
                                                "shape": 3,
                                                "label": "上"
                                            },
                                            {
                                                "name": "left_int",
                                                "type": "INT",
                                                "links": [
                                                    190,
                                                    196
                                                ],
                                                "slot_index": 3,
                                                "shape": 3,
                                                "label": "左"
                                            },
                                            {
                                                "name": "right_int",
                                                "type": "INT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "右"
                                            },
                                            {
                                                "name": "bottom_int",
                                                "type": "INT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "下"
                                            },
                                            {
                                                "name": "width_int",
                                                "type": "INT",
                                                "links": [
                                                    114,
                                                    398
                                                ],
                                                "slot_index": 6,
                                                "shape": 3,
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height_int",
                                                "type": "INT",
                                                "links": [
                                                    115,
                                                    397
                                                ],
                                                "slot_index": 7,
                                                "shape": 3,
                                                "label": "高度"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Mask Crop Region"
                                        },
                                        "widgets_values": [
                                            50,
                                            "dominant"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 37,
                                        "type": "IPAdapterAdvanced",
                                        "pos": {
                                            "0": 342.0740661621094,
                                            "1": 1547.4315185546875
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 278
                                        },
                                        "flags": {},
                                        "order": 36,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 95,
                                                "slot_index": 0,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "ipadapter",
                                                "type": "IPADAPTER",
                                                "link": 93,
                                                "slot_index": 1,
                                                "label": "IPAdapter"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 481,
                                                "slot_index": 2,
                                                "label": "正面图像"
                                            },
                                            {
                                                "name": "image_negative",
                                                "type": "IMAGE",
                                                "link": null,
                                                "label": "负面图像",
                                                "shape": 7
                                            },
                                            {
                                                "name": "attn_mask",
                                                "type": "MASK",
                                                "link": 377,
                                                "label": "关注层遮罩",
                                                "shape": 7
                                            },
                                            {
                                                "name": "clip_vision",
                                                "type": "CLIP_VISION",
                                                "link": 94,
                                                "slot_index": 5,
                                                "label": "CLIP视觉",
                                                "shape": 7
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [
                                                    466
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "IPAdapterAdvanced"
                                        },
                                        "widgets_values": [
                                            0.85,
                                            "strong style transfer",
                                            "concat",
                                            0,
                                            1,
                                            "V only"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 21,
                                        "type": "ACN_AdvancedControlNetApply",
                                        "pos": {
                                            "0": 712.3056640625,
                                            "1": 1538.15673828125
                                        },
                                        "size": {
                                            "0": 355.20001220703125,
                                            "1": 286
                                        },
                                        "flags": {},
                                        "order": 35,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "link": 45,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "link": 46,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "control_net",
                                                "type": "CONTROL_NET",
                                                "link": 49,
                                                "slot_index": 2,
                                                "label": "ControlNet"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 387,
                                                "slot_index": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "mask_optional",
                                                "type": "MASK",
                                                "link": null,
                                                "label": "遮罩",
                                                "shape": 7
                                            },
                                            {
                                                "name": "timestep_kf",
                                                "type": "TIMESTEP_KEYFRAME",
                                                "link": null,
                                                "label": "帧间隔",
                                                "shape": 7
                                            },
                                            {
                                                "name": "latent_kf_override",
                                                "type": "LATENT_KEYFRAME",
                                                "link": null,
                                                "label": "覆盖Latent关键帧",
                                                "shape": 7
                                            },
                                            {
                                                "name": "weights_override",
                                                "type": "CONTROL_NET_WEIGHTS",
                                                "link": null,
                                                "label": "覆盖ControlNet权重",
                                                "shape": 7
                                            },
                                            {
                                                "name": "model_optional",
                                                "type": "MODEL",
                                                "link": 51,
                                                "label": "模型(可选)",
                                                "shape": 7
                                            },
                                            {
                                                "name": "vae_optional",
                                                "type": "VAE",
                                                "link": null,
                                                "shape": 7
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    47
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    48
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "model_opt",
                                                "type": "MODEL",
                                                "links": [
                                                    95
                                                ],
                                                "slot_index": 2,
                                                "shape": 3
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ACN_AdvancedControlNetApply"
                                        },
                                        "widgets_values": [
                                            1,
                                            0,
                                            1,
                                            ""
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 17,
                                        "type": "VAEDecode",
                                        "pos": {
                                            "0": 1129.4637451171875,
                                            "1": 1848.3509521484375
                                        },
                                        "size": {
                                            "0": 308.7232360839844,
                                            "1": 46
                                        },
                                        "flags": {},
                                        "order": 39,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "samples",
                                                "type": "LATENT",
                                                "link": 34,
                                                "label": "Latent"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 25,
                                                "label": "VAE"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    250,
                                                    251,
                                                    292
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAEDecode"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 66,
                                        "type": "PreviewBridge",
                                        "pos": {
                                            "0": 1920.9796142578125,
                                            "1": 2034.2513427734375
                                        },
                                        "size": {
                                            "0": 382.8829345703125,
                                            "1": 376.4209899902344
                                        },
                                        "flags": {
                                            "collapsed": true
                                        },
                                        "order": 41,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 251,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    409
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    259
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "PreviewBridge"
                                        },
                                        "widgets_values": [
                                            "$66-0",
                                            false
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 90,
                                        "type": "PreviewBridge",
                                        "pos": {
                                            "0": 1918.9796142578125,
                                            "1": 1968.2513427734375
                                        },
                                        "size": {
                                            "0": 392.6890869140625,
                                            "1": 357.50244140625
                                        },
                                        "flags": {
                                            "collapsed": true
                                        },
                                        "order": 42,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 292,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": null,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    428
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "PreviewBridge"
                                        },
                                        "widgets_values": [
                                            "$90-0",
                                            false
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 71,
                                        "type": "MaskBlur+",
                                        "pos": {
                                            "0": 1898.052490234375,
                                            "1": 1571.91845703125
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 82
                                        },
                                        "flags": {},
                                        "order": 48,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 453,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    454,
                                                    463
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "MaskBlur+"
                                        },
                                        "widgets_values": [
                                            2.6,
                                            "auto"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 123,
                                        "type": "ImpactDilateMask",
                                        "pos": {
                                            "0": 1898.052490234375,
                                            "1": 1701.91845703125
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 47,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 452,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    453
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImpactDilateMask"
                                        },
                                        "widgets_values": [
                                            4
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 67,
                                        "type": "SubtractMask",
                                        "pos": {
                                            "0": 1898.052490234375,
                                            "1": 1781.91845703125
                                        },
                                        "size": {
                                            "0": 315.5653076171875,
                                            "1": 46
                                        },
                                        "flags": {},
                                        "order": 46,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask1",
                                                "type": "MASK",
                                                "link": 427,
                                                "label": "遮罩1"
                                            },
                                            {
                                                "name": "mask2",
                                                "type": "MASK",
                                                "link": 428,
                                                "label": "遮罩2"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    452
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "SubtractMask"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 79,
                                        "type": "AddMask",
                                        "pos": {
                                            "0": 1898.052490234375,
                                            "1": 1861.91845703125
                                        },
                                        "size": {
                                            "0": 315.4705810546875,
                                            "1": 46
                                        },
                                        "flags": {},
                                        "order": 45,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask1",
                                                "type": "MASK",
                                                "link": 534,
                                                "label": "遮罩1"
                                            },
                                            {
                                                "name": "mask2",
                                                "type": "MASK",
                                                "link": 259,
                                                "label": "遮罩2"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    427
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "AddMask"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 97,
                                        "type": "ImageSizeAndBatchSize",
                                        "pos": {
                                            "0": 1898.052490234375,
                                            "1": 1941.91845703125
                                        },
                                        "size": {
                                            "0": 314.4083557128906,
                                            "1": 66
                                        },
                                        "flags": {},
                                        "order": 27,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 338,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "width",
                                                "type": "INT",
                                                "links": [
                                                    411
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height",
                                                "type": "INT",
                                                "links": [
                                                    412
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "高度"
                                            },
                                            {
                                                "name": "batch_size",
                                                "type": "INT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "批次大小"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageSizeAndBatchSize"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 5,
                                        "type": "ImageCompositeMasked",
                                        "pos": {
                                            "0": 2218.052490234375,
                                            "1": 1571.91845703125
                                        },
                                        "size": {
                                            "0": 301.91082763671875,
                                            "1": 139.5709228515625
                                        },
                                        "flags": {},
                                        "order": 51,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "destination",
                                                "type": "IMAGE",
                                                "link": 461,
                                                "label": "目标图像"
                                            },
                                            {
                                                "name": "source",
                                                "type": "IMAGE",
                                                "link": 410,
                                                "label": "源图像"
                                            },
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 464,
                                                "label": "遮罩",
                                                "shape": 7
                                            },
                                            {
                                                "name": "x",
                                                "type": "INT",
                                                "link": 196,
                                                "widget": {
                                                    "name": "x"
                                                },
                                                "label": "X"
                                            },
                                            {
                                                "name": "y",
                                                "type": "INT",
                                                "link": 195,
                                                "widget": {
                                                    "name": "y"
                                                },
                                                "label": "Y"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    539
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageCompositeMasked"
                                        },
                                        "widgets_values": [
                                            1201,
                                            943,
                                            false
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 151,
                                        "type": "GroundingDinoModelLoader (segment anything)",
                                        "pos": {
                                            "0": -1180.864990234375,
                                            "1": 1530.2861328125
                                        },
                                        "size": {
                                            "0": 354.1417236328125,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 6,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "GROUNDING_DINO_MODEL",
                                                "type": "GROUNDING_DINO_MODEL",
                                                "links": [
                                                    497
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "G-Dino模型"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "GroundingDinoModelLoader (segment anything)"
                                        },
                                        "widgets_values": [
                                            "GroundingDINO_SwinT_OGC (694MB)"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 140,
                                        "type": "ShowText|pysssss",
                                        "pos": {
                                            "0": -20,
                                            "1": 1830
                                        },
                                        "size": {
                                            "0": 327.6601867675781,
                                            "1": 76
                                        },
                                        "flags": {},
                                        "order": 20,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "text",
                                                "type": "STRING",
                                                "link": 472,
                                                "widget": {
                                                    "name": "text"
                                                },
                                                "label": "文本"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "STRING",
                                                "type": "STRING",
                                                "links": null,
                                                "shape": 6,
                                                "label": "字符串"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ShowText|pysssss"
                                        },
                                        "widgets_values": [
                                            "",
                                            "photo of chair  high quality"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 18,
                                        "type": "CLIPTextEncode",
                                        "pos": {
                                            "0": -20,
                                            "1": 1940
                                        },
                                        "size": {
                                            "0": 320.4534606933594,
                                            "1": 136.41944885253906
                                        },
                                        "flags": {},
                                        "order": 19,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 27,
                                                "label": "CLIP"
                                            },
                                            {
                                                "name": "text",
                                                "type": "STRING",
                                                "link": 373,
                                                "widget": {
                                                    "name": "text"
                                                },
                                                "label": "文本"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    40
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CLIPTextEncode"
                                        },
                                        "widgets_values": [
                                            "photo of a water paddle in the middle of a street, high quality , sharp, "
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 19,
                                        "type": "CLIPTextEncode",
                                        "pos": {
                                            "0": -10,
                                            "1": 2110
                                        },
                                        "size": {
                                            "0": 303.9556884765625,
                                            "1": 160.14015197753906
                                        },
                                        "flags": {},
                                        "order": 13,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 29,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    41
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CLIPTextEncode"
                                        },
                                        "widgets_values": [
                                            "blur, text, watermark, CGI, Unreal, Airbrushed, Digital "
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#322",
                                        "bgcolor": "#533"
                                    },
                                    {
                                        "id": 132,
                                        "type": "PrimitiveNode",
                                        "pos": {
                                            "0": -15.364324569702148,
                                            "1": 1531.601806640625
                                        },
                                        "size": {
                                            "0": 313.0224609375,
                                            "1": 61.5018310546875
                                        },
                                        "flags": {},
                                        "order": 7,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "STRING",
                                                "type": "STRING",
                                                "links": [
                                                    468
                                                ],
                                                "slot_index": 0,
                                                "widget": {
                                                    "name": "text"
                                                }
                                            }
                                        ],
                                        "properties": {
                                            "Run widget replace on values": false
                                        },
                                        "widgets_values": [
                                            "photo of xxx yyy high quality"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 96,
                                        "type": "ImageResize+",
                                        "pos": {
                                            "0": -772.4590454101562,
                                            "1": 1854.9677734375
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 218
                                        },
                                        "flags": {},
                                        "order": 25,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 333,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    334
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "width",
                                                "type": "INT",
                                                "links": [],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height",
                                                "type": "INT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "高度"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageResize+"
                                        },
                                        "widgets_values": [
                                            1024,
                                            1024,
                                            "lanczos",
                                            "keep proportion",
                                            "upscale if smaller",
                                            0
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 94,
                                        "type": "ImageResize+",
                                        "pos": {
                                            "0": -442.45904541015625,
                                            "1": 1774.9677734375
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 218
                                        },
                                        "flags": {},
                                        "order": 26,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 326,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    374
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "width",
                                                "type": "INT",
                                                "links": [],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height",
                                                "type": "INT",
                                                "links": [],
                                                "slot_index": 2,
                                                "shape": 3,
                                                "label": "高度"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageResize+"
                                        },
                                        "widgets_values": [
                                            1024,
                                            1024,
                                            "lanczos",
                                            "keep proportion",
                                            "always",
                                            0
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 35,
                                        "type": "MaskBlur+",
                                        "pos": {
                                            "0": -442.45904541015625,
                                            "1": 2304.9677734375
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 82
                                        },
                                        "flags": {},
                                        "order": 33,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 515,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    375,
                                                    377
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "MaskBlur+"
                                        },
                                        "widgets_values": [
                                            20,
                                            "auto"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 170,
                                        "type": "Mask Fill Holes",
                                        "pos": {
                                            "0": 1498.038330078125,
                                            "1": 1716.7646484375
                                        },
                                        "size": {
                                            "0": 354.31072998046875,
                                            "1": 26
                                        },
                                        "flags": {},
                                        "order": 43,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "masks",
                                                "type": "MASK",
                                                "link": 533,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASKS",
                                                "type": "MASK",
                                                "links": [
                                                    534
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Mask Fill Holes"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 100,
                                        "type": "Text Find and Replace",
                                        "pos": {
                                            "0": -20,
                                            "1": 1630
                                        },
                                        "size": {
                                            "0": 317.4000244140625,
                                            "1": 166
                                        },
                                        "flags": {},
                                        "order": 16,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "text",
                                                "type": "STRING",
                                                "link": 371,
                                                "widget": {
                                                    "name": "text"
                                                },
                                                "label": "文本"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "result_text",
                                                "type": "STRING",
                                                "links": [
                                                    373,
                                                    472
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "文本"
                                            },
                                            {
                                                "name": "replacement_count_number",
                                                "type": "NUMBER",
                                                "links": null,
                                                "shape": 3,
                                                "label": "替换数量(数字)"
                                            },
                                            {
                                                "name": "replacement_count_float",
                                                "type": "FLOAT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "替换数量(浮点)"
                                            },
                                            {
                                                "name": "replacement_count_int",
                                                "type": "INT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "替换数量(整数)"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Text Find and Replace"
                                        },
                                        "widgets_values": [
                                            "",
                                            "yyy",
                                            ""
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 15,
                                        "type": "CheckpointLoaderSimple",
                                        "pos": {
                                            "0": -1141,
                                            "1": 1235
                                        },
                                        "size": {
                                            "0": 443.66693115234375,
                                            "1": 98.60050964355469
                                        },
                                        "flags": {},
                                        "order": 8,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [
                                                    51
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "CLIP",
                                                "type": "CLIP",
                                                "links": [
                                                    27,
                                                    29
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "CLIP"
                                            },
                                            {
                                                "name": "VAE",
                                                "type": "VAE",
                                                "links": [
                                                    25,
                                                    38
                                                ],
                                                "slot_index": 2,
                                                "shape": 3,
                                                "label": "VAE"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CheckpointLoaderSimple"
                                        },
                                        "widgets_values": [
                                            "juggernautXL_v9-Lightning_4S_V9 + RDPhoto 2"
                                        ],
                                        "_widget_cache_map": {
                                            "juggernautXL_v9-Lightning_4S_V9 + RDPhoto 2": {
                                                "name": "juggernautXL_v9-Lightning_4S_V9 + RDPhoto 2",
                                                "value": 1127394
                                            },
                                            "juggernautXL_v9_V9 + RDPhoto 2": {
                                                "name": "juggernautXL_v9_V9 + RDPhoto 2",
                                                "value": 1107768
                                            },
                                            "真实感Juggernaut XL_V9+RDPhoto2-Lightning_4S": {
                                                "name": "真实感Juggernaut XL_V9+RDPhoto2-Lightning_4S",
                                                "value": 1821358
                                            }
                                        }
                                    },
                                    {
                                        "id": 198,
                                        "type": "LayerMask: SegmentAnythingUltra V2",
                                        "pos": {
                                            "0": -2032,
                                            "1": 2045
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 342
                                        },
                                        "flags": {},
                                        "order": 9,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": null,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "links": null,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "links": null,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "LayerMask: SegmentAnythingUltra V2"
                                        },
                                        "widgets_values": [
                                            "sam_vit_h_4b8939.pth",
                                            "GroundingDINO_SwinT_OGC (694MB)",
                                            0.3,
                                            "VITMatte",
                                            6,
                                            6,
                                            0.15,
                                            0.99,
                                            true,
                                            "subject",
                                            "cuda",
                                            2
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "rgba(27, 80, 119, 0.7)"
                                    },
                                    {
                                        "id": 84,
                                        "type": "Text Find and Replace",
                                        "pos": {
                                            "0": -1521,
                                            "1": 1423
                                        },
                                        "size": {
                                            "0": 317.4000244140625,
                                            "1": 166
                                        },
                                        "flags": {},
                                        "order": 12,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "text",
                                                "type": "STRING",
                                                "link": 468,
                                                "widget": {
                                                    "name": "text"
                                                },
                                                "label": "文本"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "result_text",
                                                "type": "STRING",
                                                "links": [
                                                    371
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "文本"
                                            },
                                            {
                                                "name": "replacement_count_number",
                                                "type": "NUMBER",
                                                "links": null,
                                                "shape": 3,
                                                "label": "替换数量(数字)"
                                            },
                                            {
                                                "name": "replacement_count_float",
                                                "type": "FLOAT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "替换数量(浮点)"
                                            },
                                            {
                                                "name": "replacement_count_int",
                                                "type": "INT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "替换数量(整数)"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Text Find and Replace"
                                        },
                                        "widgets_values": [
                                            "photo of xxx yyy high quality",
                                            "xxx",
                                            "sofa"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 173,
                                        "type": "SaveImage",
                                        "pos": {
                                            "0": 2619,
                                            "1": 1575
                                        },
                                        "size": {
                                            "0": 1155.0555419921875,
                                            "1": 1183.6673583984375
                                        },
                                        "flags": {},
                                        "order": 52,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 539,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "SaveImage"
                                        },
                                        "widgets_values": [
                                            "ComfyUI"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 73,
                                        "type": "GroundingDinoSAMSegment (segment anything)",
                                        "pos": {
                                            "0": -1556,
                                            "1": 1818
                                        },
                                        "size": {
                                            "0": 352.79998779296875,
                                            "1": 122
                                        },
                                        "flags": {},
                                        "order": 40,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "sam_model",
                                                "type": "SAM_MODEL",
                                                "link": 233,
                                                "slot_index": 0,
                                                "label": "SAM模型"
                                            },
                                            {
                                                "name": "grounding_dino_model",
                                                "type": "GROUNDING_DINO_MODEL",
                                                "link": 232,
                                                "label": "G-Dino模型"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 250,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": " 图像"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    533
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "GroundingDinoSAMSegment (segment anything)"
                                        },
                                        "widgets_values": [
                                            "sofa",
                                            0.25
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 130,
                                        "type": "ImageMaskSwitch",
                                        "pos": {
                                            "0": -1139,
                                            "1": 348
                                        },
                                        "size": {
                                            "0": 304.4635314941406,
                                            "1": 198
                                        },
                                        "flags": {
                                            "collapsed": false
                                        },
                                        "order": 50,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images1",
                                                "type": "IMAGE",
                                                "link": 566,
                                                "label": "图像1"
                                            },
                                            {
                                                "name": "mask1_opt",
                                                "type": "MASK",
                                                "link": 463,
                                                "label": "遮罩1",
                                                "shape": 7
                                            },
                                            {
                                                "name": "images2_opt",
                                                "type": "IMAGE",
                                                "link": 567,
                                                "label": "图像2",
                                                "shape": 7
                                            },
                                            {
                                                "name": "mask2_opt",
                                                "type": "MASK",
                                                "link": 462,
                                                "label": "遮罩2",
                                                "shape": 7
                                            },
                                            {
                                                "name": "images3_opt",
                                                "type": "IMAGE",
                                                "link": null,
                                                "label": "图像3",
                                                "shape": 7
                                            },
                                            {
                                                "name": "mask3_opt",
                                                "type": "MASK",
                                                "link": null,
                                                "label": "遮罩3",
                                                "shape": 7
                                            },
                                            {
                                                "name": "images4_opt",
                                                "type": "IMAGE",
                                                "link": null,
                                                "label": "图像4",
                                                "shape": 7
                                            },
                                            {
                                                "name": "mask4_opt",
                                                "type": "MASK",
                                                "link": null,
                                                "label": "遮罩4",
                                                "shape": 7
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    461
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    464
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageMaskSwitch"
                                        },
                                        "widgets_values": [
                                            1
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 152,
                                        "type": "GroundingDinoSAMSegment (segment anything)",
                                        "pos": {
                                            "0": -1571,
                                            "1": 1636
                                        },
                                        "size": {
                                            "0": 352.79998779296875,
                                            "1": 122
                                        },
                                        "flags": {},
                                        "order": 17,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "sam_model",
                                                "type": "SAM_MODEL",
                                                "link": 496,
                                                "slot_index": 0,
                                                "label": "SAM模型"
                                            },
                                            {
                                                "name": "grounding_dino_model",
                                                "type": "GROUNDING_DINO_MODEL",
                                                "link": 497,
                                                "label": "G-Dino模型"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 568,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": " 图像"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    501
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "GroundingDinoSAMSegment (segment anything)"
                                        },
                                        "widgets_values": [
                                            "sofa",
                                            0.25
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 52,
                                        "type": "ImageCrop+",
                                        "pos": {
                                            "0": -282,
                                            "1": 1018
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 194
                                        },
                                        "flags": {},
                                        "order": 23,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 569,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "width",
                                                "type": "INT",
                                                "link": 114,
                                                "widget": {
                                                    "name": "width"
                                                },
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height",
                                                "type": "INT",
                                                "link": 115,
                                                "widget": {
                                                    "name": "height"
                                                },
                                                "label": "高度"
                                            },
                                            {
                                                "name": "x_offset",
                                                "type": "INT",
                                                "link": 190,
                                                "widget": {
                                                    "name": "x_offset"
                                                },
                                                "label": "X偏移"
                                            },
                                            {
                                                "name": "y_offset",
                                                "type": "INT",
                                                "link": 192,
                                                "widget": {
                                                    "name": "y_offset"
                                                },
                                                "label": "Y偏移"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    326,
                                                    338,
                                                    386
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "x",
                                                "type": "INT",
                                                "links": [],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "X"
                                            },
                                            {
                                                "name": "y",
                                                "type": "INT",
                                                "links": [],
                                                "slot_index": 2,
                                                "shape": 3,
                                                "label": "Y"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageCrop+"
                                        },
                                        "widgets_values": [
                                            256,
                                            256,
                                            "top-left",
                                            0,
                                            0
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 77,
                                        "type": "PrepImageForClipVision",
                                        "pos": {
                                            "0": -435,
                                            "1": 3024
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 106
                                        },
                                        "flags": {},
                                        "order": 18,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 570,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    481
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "PrepImageForClipVision"
                                        },
                                        "widgets_values": [
                                            "LANCZOS",
                                            "left",
                                            0.15
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 56,
                                        "type": "ImageToMask",
                                        "pos": {
                                            "0": -775,
                                            "1": 2108
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 29,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 334,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    509
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageToMask"
                                        },
                                        "widgets_values": [
                                            "red"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 158,
                                        "type": "Mask Fill Holes",
                                        "pos": {
                                            "0": -770,
                                            "1": 2204
                                        },
                                        "size": {
                                            "0": 312.1390686035156,
                                            "1": 58.27000045776367
                                        },
                                        "flags": {},
                                        "order": 30,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "masks",
                                                "type": "MASK",
                                                "link": 509,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASKS",
                                                "type": "MASK",
                                                "links": [
                                                    510
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Mask Fill Holes"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 68,
                                        "type": "MaskPreview+",
                                        "pos": {
                                            "0": 1908,
                                            "1": 2042
                                        },
                                        "size": {
                                            "0": 306.6614685058594,
                                            "1": 292.5083923339844
                                        },
                                        "flags": {},
                                        "order": 49,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 454,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "MaskPreview+"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 202,
                                        "type": "LoadImageFromUrl",
                                        "pos": {
                                            "0": -3748,
                                            "1": 2321
                                        },
                                        "size": [
                                            210,
                                            408
                                        ],
                                        "flags": {},
                                        "order": 15,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "STRING",
                                                "link": 572,
                                                "widget": {
                                                    "name": "image"
                                                },
                                                "shape": 7
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "links": [
                                                    570
                                                ],
                                                "slot_index": 0,
                                                "shape": 6,
                                                "label": "images"
                                            },
                                            {
                                                "name": "masks",
                                                "type": "MASK",
                                                "links": null,
                                                "shape": 6,
                                                "label": "masks"
                                            },
                                            {
                                                "name": "has_image",
                                                "type": "BOOLEAN",
                                                "links": null,
                                                "label": "has_image"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "LoadImageFromUrl"
                                        },
                                        "widgets_values": {
                                            "image": "",
                                            "keep_alpha_channel": false,
                                            "output_mode": false,
                                            "choose image to upload": "image"
                                        },
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 201,
                                        "type": "LoadImageFromUrl",
                                        "pos": {
                                            "0": -3800,
                                            "1": 601
                                        },
                                        "size": [
                                            210,
                                            508
                                        ],
                                        "flags": {},
                                        "order": 14,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "STRING",
                                                "link": 571,
                                                "widget": {
                                                    "name": "image"
                                                },
                                                "shape": 7
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "links": [
                                                    566,
                                                    567,
                                                    568,
                                                    569
                                                ],
                                                "slot_index": 0,
                                                "shape": 6,
                                                "label": "images"
                                            },
                                            {
                                                "name": "masks",
                                                "type": "MASK",
                                                "links": null,
                                                "shape": 6,
                                                "label": "masks"
                                            },
                                            {
                                                "name": "has_image",
                                                "type": "BOOLEAN",
                                                "links": null,
                                                "label": "has_image"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "LoadImageFromUrl"
                                        },
                                        "widgets_values": {
                                            "image": "",
                                            "keep_alpha_channel": false,
                                            "output_mode": false,
                                            "choose image to upload": "image"
                                        },
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 203,
                                        "type": "Simple String",
                                        "pos": {
                                            "0": -4160,
                                            "1": 478
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 10,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "STRING",
                                                "type": "STRING",
                                                "links": [
                                                    571
                                                ],
                                                "label": "字符串",
                                                "slot_index": 0
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Simple String"
                                        },
                                        "widgets_values": [
                                            "http://yorolook.com/upload/202307/07/202307071413379490.png"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 204,
                                        "type": "Simple String",
                                        "pos": {
                                            "0": -4316,
                                            "1": 2281
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 11,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "STRING",
                                                "type": "STRING",
                                                "links": [
                                                    572
                                                ],
                                                "label": "字符串",
                                                "slot_index": 0
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Simple String"
                                        },
                                        "widgets_values": [
                                            "https://m.media-amazon.com/images/I/91EMJuoz+QL._AC_SL1500_.jpg"
                                        ],
                                        "_widget_cache_map": {}
                                    }
                                ],
                                "links": [
                                    [
                                        25,
                                        15,
                                        2,
                                        17,
                                        1,
                                        "VAE"
                                    ],
                                    [
                                        27,
                                        15,
                                        1,
                                        18,
                                        0,
                                        "CLIP"
                                    ],
                                    [
                                        29,
                                        15,
                                        1,
                                        19,
                                        0,
                                        "CLIP"
                                    ],
                                    [
                                        34,
                                        16,
                                        0,
                                        17,
                                        0,
                                        "LATENT"
                                    ],
                                    [
                                        38,
                                        15,
                                        2,
                                        20,
                                        2,
                                        "VAE"
                                    ],
                                    [
                                        40,
                                        18,
                                        0,
                                        20,
                                        0,
                                        "CONDITIONING"
                                    ],
                                    [
                                        41,
                                        19,
                                        0,
                                        20,
                                        1,
                                        "CONDITIONING"
                                    ],
                                    [
                                        45,
                                        20,
                                        0,
                                        21,
                                        0,
                                        "CONDITIONING"
                                    ],
                                    [
                                        46,
                                        20,
                                        1,
                                        21,
                                        1,
                                        "CONDITIONING"
                                    ],
                                    [
                                        47,
                                        21,
                                        0,
                                        16,
                                        1,
                                        "CONDITIONING"
                                    ],
                                    [
                                        48,
                                        21,
                                        1,
                                        16,
                                        2,
                                        "CONDITIONING"
                                    ],
                                    [
                                        49,
                                        22,
                                        0,
                                        21,
                                        2,
                                        "CONTROL_NET"
                                    ],
                                    [
                                        51,
                                        15,
                                        0,
                                        21,
                                        8,
                                        "MODEL"
                                    ],
                                    [
                                        93,
                                        40,
                                        0,
                                        37,
                                        1,
                                        "IPADAPTER"
                                    ],
                                    [
                                        94,
                                        41,
                                        0,
                                        37,
                                        5,
                                        "CLIP_VISION"
                                    ],
                                    [
                                        95,
                                        21,
                                        2,
                                        37,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        114,
                                        48,
                                        6,
                                        52,
                                        1,
                                        "INT"
                                    ],
                                    [
                                        115,
                                        48,
                                        7,
                                        52,
                                        2,
                                        "INT"
                                    ],
                                    [
                                        122,
                                        48,
                                        0,
                                        54,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        190,
                                        48,
                                        3,
                                        52,
                                        3,
                                        "INT"
                                    ],
                                    [
                                        192,
                                        48,
                                        2,
                                        52,
                                        4,
                                        "INT"
                                    ],
                                    [
                                        195,
                                        48,
                                        2,
                                        5,
                                        4,
                                        "INT"
                                    ],
                                    [
                                        196,
                                        48,
                                        3,
                                        5,
                                        3,
                                        "INT"
                                    ],
                                    [
                                        232,
                                        72,
                                        0,
                                        73,
                                        1,
                                        "GROUNDING_DINO_MODEL"
                                    ],
                                    [
                                        233,
                                        74,
                                        0,
                                        73,
                                        0,
                                        "SAM_MODEL"
                                    ],
                                    [
                                        250,
                                        17,
                                        0,
                                        73,
                                        2,
                                        "IMAGE"
                                    ],
                                    [
                                        251,
                                        17,
                                        0,
                                        66,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        259,
                                        66,
                                        1,
                                        79,
                                        1,
                                        "MASK"
                                    ],
                                    [
                                        292,
                                        17,
                                        0,
                                        90,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        326,
                                        52,
                                        0,
                                        94,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        333,
                                        54,
                                        0,
                                        96,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        334,
                                        96,
                                        0,
                                        56,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        338,
                                        52,
                                        0,
                                        97,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        371,
                                        84,
                                        0,
                                        100,
                                        0,
                                        "STRING"
                                    ],
                                    [
                                        373,
                                        100,
                                        0,
                                        18,
                                        1,
                                        "STRING"
                                    ],
                                    [
                                        374,
                                        94,
                                        0,
                                        20,
                                        3,
                                        "IMAGE"
                                    ],
                                    [
                                        375,
                                        35,
                                        0,
                                        20,
                                        4,
                                        "MASK"
                                    ],
                                    [
                                        377,
                                        35,
                                        0,
                                        37,
                                        4,
                                        "MASK"
                                    ],
                                    [
                                        386,
                                        52,
                                        0,
                                        111,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        387,
                                        111,
                                        0,
                                        21,
                                        3,
                                        "IMAGE"
                                    ],
                                    [
                                        389,
                                        20,
                                        2,
                                        16,
                                        3,
                                        "LATENT"
                                    ],
                                    [
                                        397,
                                        48,
                                        7,
                                        86,
                                        1,
                                        "INT"
                                    ],
                                    [
                                        398,
                                        48,
                                        6,
                                        86,
                                        0,
                                        "INT"
                                    ],
                                    [
                                        409,
                                        66,
                                        0,
                                        116,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        410,
                                        116,
                                        0,
                                        5,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        411,
                                        97,
                                        0,
                                        116,
                                        1,
                                        "INT"
                                    ],
                                    [
                                        412,
                                        97,
                                        1,
                                        116,
                                        2,
                                        "INT"
                                    ],
                                    [
                                        427,
                                        79,
                                        0,
                                        67,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        428,
                                        90,
                                        1,
                                        67,
                                        1,
                                        "MASK"
                                    ],
                                    [
                                        452,
                                        67,
                                        0,
                                        123,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        453,
                                        123,
                                        0,
                                        71,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        454,
                                        71,
                                        0,
                                        68,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        461,
                                        130,
                                        0,
                                        5,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        462,
                                        86,
                                        0,
                                        130,
                                        3,
                                        "MASK"
                                    ],
                                    [
                                        463,
                                        71,
                                        0,
                                        130,
                                        1,
                                        "MASK"
                                    ],
                                    [
                                        464,
                                        130,
                                        1,
                                        5,
                                        2,
                                        "MASK"
                                    ],
                                    [
                                        466,
                                        37,
                                        0,
                                        61,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        468,
                                        132,
                                        0,
                                        84,
                                        0,
                                        "STRING"
                                    ],
                                    [
                                        472,
                                        100,
                                        0,
                                        140,
                                        0,
                                        "STRING"
                                    ],
                                    [
                                        481,
                                        77,
                                        0,
                                        37,
                                        2,
                                        "IMAGE"
                                    ],
                                    [
                                        496,
                                        153,
                                        0,
                                        152,
                                        0,
                                        "SAM_MODEL"
                                    ],
                                    [
                                        497,
                                        151,
                                        0,
                                        152,
                                        1,
                                        "GROUNDING_DINO_MODEL"
                                    ],
                                    [
                                        501,
                                        152,
                                        1,
                                        48,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        509,
                                        56,
                                        0,
                                        158,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        510,
                                        158,
                                        0,
                                        156,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        512,
                                        61,
                                        0,
                                        16,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        514,
                                        156,
                                        0,
                                        160,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        515,
                                        160,
                                        0,
                                        35,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        533,
                                        73,
                                        1,
                                        170,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        534,
                                        170,
                                        0,
                                        79,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        539,
                                        5,
                                        0,
                                        173,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        566,
                                        201,
                                        0,
                                        130,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        567,
                                        201,
                                        0,
                                        130,
                                        2,
                                        "IMAGE"
                                    ],
                                    [
                                        568,
                                        201,
                                        0,
                                        152,
                                        2,
                                        "IMAGE"
                                    ],
                                    [
                                        569,
                                        201,
                                        0,
                                        52,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        570,
                                        202,
                                        0,
                                        77,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        571,
                                        203,
                                        0,
                                        201,
                                        0,
                                        "STRING"
                                    ],
                                    [
                                        572,
                                        204,
                                        0,
                                        202,
                                        0,
                                        "STRING"
                                    ]
                                ],
                                "groups": [
                                    {
                                        "title": "IPAdapter",
                                        "bounding": [
                                            328,
                                            1414,
                                            353,
                                            743
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 70,
                                        "flags": {}
                                    },
                                    {
                                        "title": "ControlNet",
                                        "bounding": [
                                            696,
                                            1416,
                                            399,
                                            921
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 60,
                                        "flags": {}
                                    },
                                    {
                                        "title": "采样",
                                        "bounding": [
                                            1108,
                                            1410,
                                            360,
                                            715
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 80,
                                        "flags": {}
                                    },
                                    {
                                        "title": "二次抠图",
                                        "bounding": [
                                            1479,
                                            1410,
                                            396,
                                            634
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 70,
                                        "flags": {}
                                    },
                                    {
                                        "title": "最终出图",
                                        "bounding": [
                                            2605,
                                            1416,
                                            1182,
                                            1376
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 80,
                                        "flags": {}
                                    },
                                    {
                                        "title": "抠出主体",
                                        "bounding": [
                                            -1192,
                                            1390,
                                            374,
                                            933
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 70,
                                        "flags": {}
                                    },
                                    {
                                        "title": "CLIP文本编码器",
                                        "bounding": [
                                            -48,
                                            1411,
                                            357,
                                            869
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 50,
                                        "flags": {}
                                    },
                                    {
                                        "title": "遮罩组件",
                                        "bounding": [
                                            -797,
                                            1381,
                                            725,
                                            1335
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 80,
                                        "flags": {}
                                    },
                                    {
                                        "title": "遮罩组件",
                                        "bounding": [
                                            1884,
                                            1412,
                                            703,
                                            1017
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 80,
                                        "flags": {}
                                    },
                                    {
                                        "title": "材质图导入区",
                                        "bounding": [
                                            -3943,
                                            1933,
                                            1192,
                                            1617
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 150,
                                        "flags": {}
                                    },
                                    {
                                        "title": "原图导入区",
                                        "bounding": [
                                            -3920,
                                            234,
                                            1185,
                                            1561
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 150,
                                        "flags": {}
                                    }
                                ],
                                "config": {},
                                "extra": {
                                    "ds": {
                                        "scale": 1.2839025177495023,
                                        "offset": [
                                            4622.118534926918,
                                            -1843.6543594302716
                                        ]
                                    },
                                    "0246.VERSION": [
                                        0,
                                        0,
                                        4
                                    ]
                                },
                                "version": 0.4,
                                "widget_idx_map": {
                                    "16": {
                                        "seed": 0,
                                        "sampler_name": 4,
                                        "scheduler": 5
                                    }
                                },
                                "seed_widgets": {
                                    "16": 0
                                }
                            }
                        }
                    },
                    "source_workflow": "8cfa4ba4aec7485b8d4701be815c4b66"
                },
                "adetailerEnable": false
            }
        },
        sort_images: (images: any[]) => {
            const sortNodes = [{
                nodeId: "201",
                title: "原图",
            }, {
                nodeId: "68",
                title: "原图遮罩",
            }, {
                nodeId: "202",
                title: "材质贴图",
            }, {
                nodeId: "66",
                title: "生图::一",
            }, {
                nodeId: "90",
                title: "生图::二",
            }, {
                nodeId: "173",
                title: "生图::三",
            }]

            let reuslt = [{}, {}, {}, {}, {}]
            for (const x of images) {
                const d = sortNodes.findIndex(j => x.nodeId == j.nodeId)
                if (d >= 0) {
                    reuslt[d] = {
                        ...x,
                        ...sortNodes[d]
                    }
                }
            }

            return reuslt.map(x => x)
        }
    },
    {
        id: "c19f81ead8b74f09b8c1fa0b42b738e1",
        name: "scene-render",
        title: "产品白底图场景渲染",
        cost: 20000,
        cost_type: "amount",
        cover: "/disk/workflow/e60cf5f5314f4b89a8604eab71a4fc89.png",
        demo_images: [
            "/disk/workflow/18fc9bb2ca6034d60f6ecef8a2c5e6ac07f9d218fa84e492940dd2ebc591a167.webp",
            "/disk/workflow/c03a4b599e2464f31434f105b8fa575761055caee16ba67f0d901ddbbe2f7302.webp",
            "/disk/workflow/79627075a93a08818ff8a64f7b7b67b768f561db2d3e502c82380e676f8d1cf6.webp"
        ],
        descript: `🎉 产品快速渲染 🌈

🌟 一键式放置产品到空间 —— 释放您的创意潜能！无论是电商产品、家具设计、室内装饰还是建筑外观，我们都能帮您轻松实现产品场景放置。

🛠️ 简单三步走：

选择产品：上传一张产品百度图。
输入提示：输入你的生成需求，例如需要把这个产品放在什么样场景、空间当中，具体放在哪个位置以及其他细节。
点击生成：一键操作，见证奇迹发生！

📱 智能识别技术 —— 我们的先进算法能够精确识别并应用新材质，无需繁琐的手动调整。

🔍 细节至上 —— 我们注重每一处细节，确保材质替换自然、真实，让最终效果栩栩如生。

🏠 多场景适用 —— 无论是家庭装修、商业空间设计，还是在线产品展示，我们的解决方案都能完美适应。

📸 前后对比展示 —— 我们提供直观的前后效果对比，让您一目了然地看到材质变换带来的惊人变化。

🚀 立即体验 —— 加入我们，探索材质变换的无限可能，让您的设计作品脱颖而出！`,
        build_params: (imageUrlA: string, prompt: string = "" , nagivePrompt: string = "") => {
            return {
                "source": 0,
                "generateType": 19,
                "taskQueuePriority": 2,
                "frontCustomerReq": {
                    "tabType": "comfy",
                    "conAndSegAndGen": "gen"
                },
                "comfyUI": {
                    "prompt": {
                        "1": {
                            "inputs": {
                                "image": "img/9aef803a2e7b4d08b7efcd974a0570d6/935a48a8907ed8598a5586d33574c770b123946ba08982a6c780ab092a5c3e0e.jpg",
                                "upload": "image"
                            },
                            "class_type": "LoadImage"
                        },
                        "45": {
                            "inputs": {
                                "brushnet": "segmentation_mask_brushnet_ckpt.safetensors",
                                "dtype": "float16"
                            },
                            "class_type": "BrushNetLoader"
                        },
                        "47": {
                            "inputs": {
                                "ckpt_name": 125488
                            },
                            "class_type": "CheckpointLoaderSimple"
                        },
                        "51": {
                            "inputs": {
                                "lora_name": "a548e0959d814887ad81846aad9f1f3d",
                                "strength_model": 0.8,
                                "strength_clip": 1,
                                "model": [
                                    "47",
                                    0
                                ],
                                "clip": [
                                    "47",
                                    1
                                ]
                            },
                            "class_type": "LoraLoader"
                        },
                        "55": {
                            "inputs": {
                                "scale": 1,
                                "start_at": 0,
                                "end_at": 10000,
                                "model": [
                                    "51",
                                    0
                                ],
                                "vae": [
                                    "47",
                                    2
                                ],
                                "image": [
                                    "88",
                                    0
                                ],
                                "mask": [
                                    "58",
                                    0
                                ],
                                "brushnet": [
                                    "45",
                                    0
                                ],
                                "positive": [
                                    "113",
                                    0
                                ],
                                "negative": [
                                    "113",
                                    1
                                ]
                            },
                            "class_type": "BrushNet"
                        },
                        "56": {
                            "inputs": {
                                "seed": 147795193001007,
                                "steps": 25,
                                "cfg": 7.5,
                                "sampler_name": "dpmpp_2m",
                                "scheduler": "karras",
                                "denoise": 1,
                                "model": [
                                    "55",
                                    0
                                ],
                                "positive": [
                                    "55",
                                    1
                                ],
                                "negative": [
                                    "55",
                                    2
                                ],
                                "latent_image": [
                                    "55",
                                    3
                                ]
                            },
                            "class_type": "KSampler"
                        },
                        "57": {
                            "inputs": {
                                "samples": [
                                    "56",
                                    0
                                ],
                                "vae": [
                                    "47",
                                    2
                                ]
                            },
                            "class_type": "VAEDecode"
                        },
                        "58": {
                            "inputs": {
                                "mask": [
                                    "110",
                                    1
                                ]
                            },
                            "class_type": "InvertMask"
                        },
                        "66": {
                            "inputs": {
                                "text": "Dining chairs, Nordic style, spacious restaurant, top view",
                                "token_normalization": "none",
                                "weight_interpretation": "A1111",
                                "clip": [
                                    "51",
                                    1
                                ]
                            },
                            "class_type": "BNK_CLIPTextEncodeAdvanced"
                        },
                        "67": {
                            "inputs": {
                                "text": "nsfw,ng_deepnegative_v1_75t,badhandv4,(worst quality:2),(low quality:2),(normal quality:2),lowres,watermark,monochrome,",
                                "token_normalization": "none",
                                "weight_interpretation": "A1111",
                                "clip": [
                                    "51",
                                    1
                                ]
                            },
                            "class_type": "BNK_CLIPTextEncodeAdvanced"
                        },
                        "88": {
                            "inputs": {
                                "max_width": 1024,
                                "max_height": 1024,
                                "min_width": 0,
                                "min_height": 0,
                                "crop_if_required": "no",
                                "images": [
                                    "1",
                                    0
                                ]
                            },
                            "class_type": "ConstrainImage|pysssss"
                        },
                        "92": {
                            "inputs": {
                                "filename_prefix": "ComfyUI",
                                "images": [
                                    "107",
                                    0
                                ]
                            },
                            "class_type": "SaveImage"
                        },
                        "93": {
                            "inputs": {
                                "image": [
                                    "88",
                                    0
                                ]
                            },
                            "class_type": "SplitImageWithAlpha"
                        },
                        "94": {
                            "inputs": {
                                "image": [
                                    "93",
                                    0
                                ]
                            },
                            "class_type": "ImageInvert"
                        },
                        "95": {
                            "inputs": {
                                "radius": 5,
                                "images": [
                                    "93",
                                    0
                                ]
                            },
                            "class_type": "ImageGaussianBlur"
                        },
                        "96": {
                            "inputs": {
                                "mode": "add",
                                "blend_percentage": 0.4,
                                "image_a": [
                                    "94",
                                    0
                                ],
                                "image_b": [
                                    "95",
                                    0
                                ]
                            },
                            "class_type": "Image Blending Mode"
                        },
                        "97": {
                            "inputs": {
                                "image": [
                                    "96",
                                    0
                                ]
                            },
                            "class_type": "ImageInvert"
                        },
                        "98": {
                            "inputs": {
                                "mode": "add",
                                "blend_percentage": 1,
                                "image_a": [
                                    "95",
                                    0
                                ],
                                "image_b": [
                                    "97",
                                    0
                                ]
                            },
                            "class_type": "Image Blending Mode"
                        },
                        "99": {
                            "inputs": {
                                "image": [
                                    "57",
                                    0
                                ]
                            },
                            "class_type": "SplitImageWithAlpha"
                        },
                        "100": {
                            "inputs": {
                                "image": [
                                    "99",
                                    0
                                ]
                            },
                            "class_type": "ImageInvert"
                        },
                        "101": {
                            "inputs": {
                                "radius": 5,
                                "images": [
                                    "99",
                                    0
                                ]
                            },
                            "class_type": "ImageGaussianBlur"
                        },
                        "102": {
                            "inputs": {
                                "mode": "add",
                                "blend_percentage": 0.5,
                                "image_a": [
                                    "100",
                                    0
                                ],
                                "image_b": [
                                    "101",
                                    0
                                ]
                            },
                            "class_type": "Image Blending Mode"
                        },
                        "103": {
                            "inputs": {
                                "image": [
                                    "102",
                                    0
                                ]
                            },
                            "class_type": "ImageInvert"
                        },
                        "104": {
                            "inputs": {
                                "mode": "add",
                                "blend_percentage": 1,
                                "image_a": [
                                    "101",
                                    0
                                ],
                                "image_b": [
                                    "103",
                                    0
                                ]
                            },
                            "class_type": "Image Blending Mode"
                        },
                        "105": {
                            "inputs": {
                                "blend_percentage": 1,
                                "image_a": [
                                    "104",
                                    0
                                ],
                                "image_b": [
                                    "98",
                                    0
                                ],
                                "mask": [
                                    "109",
                                    0
                                ]
                            },
                            "class_type": "Image Blend by Mask"
                        },
                        "106": {
                            "inputs": {
                                "mode": "add",
                                "blend_percentage": 0.65,
                                "image_a": [
                                    "101",
                                    0
                                ],
                                "image_b": [
                                    "105",
                                    0
                                ]
                            },
                            "class_type": "Image Blending Mode"
                        },
                        "107": {
                            "inputs": {
                                "black_level": 80,
                                "mid_level": 120,
                                "white_level": 180,
                                "image": [
                                    "106",
                                    0
                                ]
                            },
                            "class_type": "Image Levels Adjustment"
                        },
                        "109": {
                            "inputs": {
                                "mask": [
                                    "110",
                                    1
                                ]
                            },
                            "class_type": "MaskToImage"
                        },
                        "110": {
                            "inputs": {
                                "torchscript_jit": "on",
                                "image": [
                                    "88",
                                    0
                                ]
                            },
                            "class_type": "InspyrenetRembg"
                        },
                        "111": {
                            "inputs": {
                                "images": [
                                    "110",
                                    0
                                ]
                            },
                            "class_type": "PreviewImage"
                        },
                        "112": {
                            "inputs": {
                                "control_net_name": "control_sd15_depth_anything"
                            },
                            "class_type": "ControlNetLoader"
                        },
                        "113": {
                            "inputs": {
                                "strength": 0.1,
                                "start_percent": 0,
                                "end_percent": 1,
                                "positive": [
                                    "66",
                                    0
                                ],
                                "negative": [
                                    "67",
                                    0
                                ],
                                "control_net": [
                                    "112",
                                    0
                                ],
                                "vae": [
                                    "47",
                                    2
                                ],
                                "image": [
                                    "114",
                                    0
                                ]
                            },
                            "class_type": "ControlNetApplySD3"
                        },
                        "114": {
                            "inputs": {
                                "ckpt_name": "depth_anything_v2_vitl.pth",
                                "resolution": 512,
                                "image": [
                                    "110",
                                    0
                                ]
                            },
                            "class_type": "DepthAnythingV2Preprocessor"
                        },
                        "117": {
                            "inputs": {
                                "lora_name": "8475dd32102040b29eb09bfe15acbcd4",
                                "strength_model": 0.8,
                                "strength_clip": 1
                            },
                            "class_type": "LoraLoader"
                        },
                        "118": {
                            "inputs": {
                                "text": "product photography,indoor,indoors,book,no humans,chair,table,scenery,desk,clock,potted plant,",
                                "token_normalization": "none",
                                "weight_interpretation": "A1111"
                            },
                            "class_type": "BNK_CLIPTextEncodeAdvanced"
                        },
                        "143": {
                            "inputs": {
                                "images": [
                                    "57",
                                    0
                                ]
                            },
                            "class_type": "PreviewImage"
                        },
                        "166": {
                            "inputs": {
                                "vae_name": "ae.sft"
                            },
                            "class_type": "VAELoader"
                        },
                        "167": {
                            "inputs": {
                                "clip_name1": "t5xxl_fp8_e4m3fn",
                                "clip_name2": "clip_l",
                                "type": "flux"
                            },
                            "class_type": "DualCLIPLoader"
                        },
                        "168": {
                            "inputs": {
                                "unet_name": "412b427ddb674b4dbab9e5abd5ae6057",
                                "weight_dtype": "fp8_e4m3fn"
                            },
                            "class_type": "UNETLoader"
                        },
                        "169": {
                            "inputs": {
                                "sampler_name": "euler"
                            },
                            "class_type": "KSamplerSelect"
                        },
                        "170": {
                            "inputs": {
                                "noise_seed": 898572418477618
                            },
                            "class_type": "RandomNoise"
                        },
                        "177": {
                            "inputs": {
                                "scheduler": "simple",
                                "steps": 20,
                                "denoise": 0.5,
                                "model": [
                                    "168",
                                    0
                                ]
                            },
                            "class_type": "BasicScheduler"
                        },
                        "178": {
                            "inputs": {
                                "width": 0,
                                "height": 3200,
                                "interpolation": "nearest",
                                "method": "keep proportion",
                                "condition": "always",
                                "multiple_of": 0,
                                "image": [
                                    "57",
                                    0
                                ]
                            },
                            "class_type": "ImageResize+"
                        },
                        "179": {
                            "inputs": {
                                "model": "wd-v1-4-vit-tagger-v2",
                                "threshold": 0.35,
                                "character_threshold": 0.85,
                                "replace_underscore": false,
                                "trailing_comma": false,
                                "exclude_tags": "",
                                "image": [
                                    "57",
                                    0
                                ]
                            },
                            "class_type": "WD14Tagger|pysssss"
                        },
                        "180": {
                            "inputs": {
                                "pixels": [
                                    "178",
                                    0
                                ],
                                "vae": [
                                    "166",
                                    0
                                ]
                            },
                            "class_type": "VAEEncode"
                        },
                        "181": {
                            "inputs": {
                                "clip_l": [
                                    "179",
                                    0
                                ],
                                "t5xxl": [
                                    "179",
                                    0
                                ],
                                "guidance": 4,
                                "clip": [
                                    "167",
                                    0
                                ]
                            },
                            "class_type": "CLIPTextEncodeFlux"
                        },
                        "182": {
                            "inputs": {
                                "text": [
                                    "179",
                                    0
                                ],
                                "text2": "(masterpiece, best qaulity:1.2),a serene night landscape with water lilies and moonlight, surrounded by fog and steam"
                            },
                            "class_type": "ShowText|pysssss"
                        },
                        "183": {
                            "inputs": {
                                "model": [
                                    "168",
                                    0
                                ],
                                "conditioning": [
                                    "181",
                                    0
                                ]
                            },
                            "class_type": "BasicGuider"
                        },
                        "184": {
                            "inputs": {
                                "noise": [
                                    "170",
                                    0
                                ],
                                "guider": [
                                    "183",
                                    0
                                ],
                                "sampler": [
                                    "169",
                                    0
                                ],
                                "sigmas": [
                                    "177",
                                    0
                                ],
                                "latent_image": [
                                    "180",
                                    0
                                ]
                            },
                            "class_type": "SamplerCustomAdvanced"
                        },
                        "185": {
                            "inputs": {
                                "samples": [
                                    "184",
                                    0
                                ],
                                "vae": [
                                    "166",
                                    0
                                ]
                            },
                            "class_type": "VAEDecode"
                        },
                        "186": {
                            "inputs": {
                                "filename_prefix": "ComfyUI",
                                "images": [
                                    "185",
                                    0
                                ]
                            },
                            "class_type": "SaveImage"
                        }
                    },
                    "extra_data": {
                        "extra_pnginfo": {
                            "workflow": {
                                "last_node_id": 187,
                                "last_link_id": 285,
                                "nodes": [
                                    {
                                        "id": 93,
                                        "type": "SplitImageWithAlpha",
                                        "pos": {
                                            "0": -6290,
                                            "1": 1260
                                        },
                                        "size": {
                                            "0": 185.10531616210938,
                                            "1": 46
                                        },
                                        "flags": {},
                                        "order": 24,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 189,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    169,
                                                    170
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "SplitImageWithAlpha"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 94,
                                        "type": "ImageInvert",
                                        "pos": {
                                            "0": -5710,
                                            "1": 1270
                                        },
                                        "size": {
                                            "0": 140,
                                            "1": 26
                                        },
                                        "flags": {},
                                        "order": 28,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 169,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    171
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageInvert"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 95,
                                        "type": "ImageGaussianBlur",
                                        "pos": {
                                            "0": -5740,
                                            "1": 1590
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 29,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 170,
                                                "label": "images"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    172,
                                                    174
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "IMAGE"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageGaussianBlur"
                                        },
                                        "widgets_values": [
                                            5
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 96,
                                        "type": "Image Blending Mode",
                                        "pos": {
                                            "0": -5190,
                                            "1": 1350
                                        },
                                        "size": {
                                            "0": 221.88836669921875,
                                            "1": 102
                                        },
                                        "flags": {},
                                        "order": 34,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image_a",
                                                "type": "IMAGE",
                                                "link": 171
                                            },
                                            {
                                                "name": "image_b",
                                                "type": "IMAGE",
                                                "link": 172
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "links": [
                                                    173
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Image Blending Mode"
                                        },
                                        "widgets_values": [
                                            "add",
                                            0.4
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 97,
                                        "type": "ImageInvert",
                                        "pos": {
                                            "0": -4800,
                                            "1": 1360
                                        },
                                        "size": {
                                            "0": 140,
                                            "1": 26
                                        },
                                        "flags": {},
                                        "order": 36,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 173,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    175
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageInvert"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 98,
                                        "type": "Image Blending Mode",
                                        "pos": {
                                            "0": -4620,
                                            "1": 1470
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 102
                                        },
                                        "flags": {},
                                        "order": 38,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image_a",
                                                "type": "IMAGE",
                                                "link": 174
                                            },
                                            {
                                                "name": "image_b",
                                                "type": "IMAGE",
                                                "link": 175
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "links": [
                                                    184
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Image Blending Mode"
                                        },
                                        "widgets_values": [
                                            "add",
                                            1
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 99,
                                        "type": "SplitImageWithAlpha",
                                        "pos": {
                                            "0": -6300,
                                            "1": 1910
                                        },
                                        "size": {
                                            "0": 185.10531616210938,
                                            "1": 46
                                        },
                                        "flags": {},
                                        "order": 41,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 188,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    176,
                                                    177
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "SplitImageWithAlpha"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 100,
                                        "type": "ImageInvert",
                                        "pos": {
                                            "0": -5750,
                                            "1": 1980
                                        },
                                        "size": {
                                            "0": 140,
                                            "1": 26
                                        },
                                        "flags": {},
                                        "order": 45,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 176,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    178
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageInvert"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 101,
                                        "type": "ImageGaussianBlur",
                                        "pos": {
                                            "0": -5780,
                                            "1": 1780
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 46,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 177,
                                                "label": "images"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    179,
                                                    181,
                                                    185
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "IMAGE"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageGaussianBlur"
                                        },
                                        "widgets_values": [
                                            5
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 102,
                                        "type": "Image Blending Mode",
                                        "pos": {
                                            "0": -5210,
                                            "1": 1900
                                        },
                                        "size": {
                                            "0": 221.88836669921875,
                                            "1": 102
                                        },
                                        "flags": {},
                                        "order": 50,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image_a",
                                                "type": "IMAGE",
                                                "link": 178
                                            },
                                            {
                                                "name": "image_b",
                                                "type": "IMAGE",
                                                "link": 179
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "links": [
                                                    180
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Image Blending Mode"
                                        },
                                        "widgets_values": [
                                            "add",
                                            0.5
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 103,
                                        "type": "ImageInvert",
                                        "pos": {
                                            "0": -4870,
                                            "1": 1920
                                        },
                                        "size": {
                                            "0": 140,
                                            "1": 26
                                        },
                                        "flags": {},
                                        "order": 52,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 180,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    182
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageInvert"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 104,
                                        "type": "Image Blending Mode",
                                        "pos": {
                                            "0": -4620,
                                            "1": 1850
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 102
                                        },
                                        "flags": {},
                                        "order": 54,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image_a",
                                                "type": "IMAGE",
                                                "link": 181
                                            },
                                            {
                                                "name": "image_b",
                                                "type": "IMAGE",
                                                "link": 182
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "links": [
                                                    183
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Image Blending Mode"
                                        },
                                        "widgets_values": [
                                            "add",
                                            1
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 105,
                                        "type": "Image Blend by Mask",
                                        "pos": {
                                            "0": -4160,
                                            "1": 1490
                                        },
                                        "size": {
                                            "0": 241.2920379638672,
                                            "1": 98
                                        },
                                        "flags": {},
                                        "order": 56,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image_a",
                                                "type": "IMAGE",
                                                "link": 183
                                            },
                                            {
                                                "name": "image_b",
                                                "type": "IMAGE",
                                                "link": 184
                                            },
                                            {
                                                "name": "mask",
                                                "type": "IMAGE",
                                                "link": 190,
                                                "label": "遮罩图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    186
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Image Blend by Mask"
                                        },
                                        "widgets_values": [
                                            1
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 106,
                                        "type": "Image Blending Mode",
                                        "pos": {
                                            "0": -4140,
                                            "1": 1830
                                        },
                                        "size": {
                                            "0": 239.31793212890625,
                                            "1": 102
                                        },
                                        "flags": {},
                                        "order": 58,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image_a",
                                                "type": "IMAGE",
                                                "link": 185
                                            },
                                            {
                                                "name": "image_b",
                                                "type": "IMAGE",
                                                "link": 186
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "links": [
                                                    187
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Image Blending Mode"
                                        },
                                        "widgets_values": [
                                            "add",
                                            0.65
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 45,
                                        "type": "BrushNetLoader",
                                        "pos": {
                                            "0": -4080,
                                            "1": 450
                                        },
                                        "size": {
                                            "0": 467.1616516113281,
                                            "1": 103.12413024902344
                                        },
                                        "flags": {},
                                        "order": 0,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "brushnet",
                                                "type": "BRMODEL",
                                                "links": [
                                                    101
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "BrushNet"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "BrushNetLoader"
                                        },
                                        "widgets_values": [
                                            "segmentation_mask_brushnet_ckpt.safetensors",
                                            "float16"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 55,
                                        "type": "BrushNet",
                                        "pos": {
                                            "0": -4080,
                                            "1": 590
                                        },
                                        "size": {
                                            "0": 466.1603698730469,
                                            "1": 425.9893493652344
                                        },
                                        "flags": {},
                                        "order": 37,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 165,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 98,
                                                "slot_index": 1,
                                                "label": "VAE"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 159,
                                                "slot_index": 2,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 112,
                                                "label": "遮罩"
                                            },
                                            {
                                                "name": "brushnet",
                                                "type": "BRMODEL",
                                                "link": 101,
                                                "slot_index": 4,
                                                "label": "BrushNet"
                                            },
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "link": 201,
                                                "slot_index": 5,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "link": 202,
                                                "slot_index": 6,
                                                "label": "负面条件"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "links": [
                                                    104
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    105
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    106
                                                ],
                                                "slot_index": 2,
                                                "shape": 3,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "latent",
                                                "type": "LATENT",
                                                "links": [
                                                    156
                                                ],
                                                "slot_index": 3,
                                                "shape": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "BrushNet"
                                        },
                                        "widgets_values": [
                                            1,
                                            0,
                                            10000
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 56,
                                        "type": "KSampler",
                                        "pos": {
                                            "0": -3391,
                                            "1": 597
                                        },
                                        "size": {
                                            "0": 453.40667724609375,
                                            "1": 411.0601501464844
                                        },
                                        "flags": {},
                                        "order": 39,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 104,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "link": 105,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "link": 106,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "latent_image",
                                                "type": "LATENT",
                                                "link": 156,
                                                "slot_index": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "LATENT",
                                                "type": "LATENT",
                                                "links": [
                                                    128
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "KSampler"
                                        },
                                        "widgets_values": [
                                            147795193001007,
                                            "randomize",
                                            25,
                                            7.5,
                                            "dpmpp_2m",
                                            "karras",
                                            1
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 109,
                                        "type": "MaskToImage",
                                        "pos": {
                                            "0": -6260,
                                            "1": 1590
                                        },
                                        "size": {
                                            "0": 204.32057189941406,
                                            "1": 74.97279357910156
                                        },
                                        "flags": {},
                                        "order": 33,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 194,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    190
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "MaskToImage"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 112,
                                        "type": "ControlNetLoader",
                                        "pos": {
                                            "0": -4879.0302734375,
                                            "1": 688.969482421875
                                        },
                                        "size": {
                                            "0": 478.03399658203125,
                                            "1": 75.17862701416016
                                        },
                                        "flags": {},
                                        "order": 1,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "CONTROL_NET",
                                                "type": "CONTROL_NET",
                                                "links": [
                                                    196
                                                ],
                                                "slot_index": 0,
                                                "label": "ControlNet"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ControlNetLoader"
                                        },
                                        "widgets_values": [
                                            "control_sd15_depth_anything"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 114,
                                        "type": "DepthAnythingV2Preprocessor",
                                        "pos": {
                                            "0": -4887.0302734375,
                                            "1": 805.969482421875
                                        },
                                        "size": {
                                            "0": 495.6255187988281,
                                            "1": 188.18698120117188
                                        },
                                        "flags": {},
                                        "order": 31,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 198,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    197
                                                ],
                                                "slot_index": 0,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "DepthAnythingV2Preprocessor"
                                        },
                                        "widgets_values": [
                                            "depth_anything_v2_vitl.pth",
                                            512
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 88,
                                        "type": "ConstrainImage|pysssss",
                                        "pos": {
                                            "0": -7016,
                                            "1": 409
                                        },
                                        "size": {
                                            "0": 457.970458984375,
                                            "1": 185.94412231445312
                                        },
                                        "flags": {},
                                        "order": 22,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 157,
                                                "slot_index": 0,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    159,
                                                    189,
                                                    192
                                                ],
                                                "slot_index": 0,
                                                "shape": 6,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ConstrainImage|pysssss"
                                        },
                                        "widgets_values": [
                                            1024,
                                            1024,
                                            0,
                                            0,
                                            "no"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 58,
                                        "type": "InvertMask",
                                        "pos": {
                                            "0": -6545,
                                            "1": 667
                                        },
                                        "size": {
                                            "0": 140,
                                            "1": 26
                                        },
                                        "flags": {},
                                        "order": 32,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "mask",
                                                "type": "MASK",
                                                "link": 193,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    112
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "InvertMask"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 113,
                                        "type": "ControlNetApplySD3",
                                        "pos": {
                                            "0": -4876.0302734375,
                                            "1": 402.969482421875
                                        },
                                        "size": {
                                            "0": 471.2063293457031,
                                            "1": 249.2242889404297
                                        },
                                        "flags": {},
                                        "order": 35,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "link": 199,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "link": 200,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "control_net",
                                                "type": "CONTROL_NET",
                                                "link": 196,
                                                "label": "ControlNet"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 203,
                                                "label": "VAE"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 197,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    201
                                                ],
                                                "slot_index": 0,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    202
                                                ],
                                                "slot_index": 1,
                                                "label": "负面条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ControlNetApplySD3"
                                        },
                                        "widgets_values": [
                                            0.1,
                                            0,
                                            1
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 110,
                                        "type": "InspyrenetRembg",
                                        "pos": {
                                            "0": -7010,
                                            "1": 640
                                        },
                                        "size": {
                                            "0": 440.9767150878906,
                                            "1": 99.40369415283203
                                        },
                                        "flags": {},
                                        "order": 25,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 192,
                                                "slot_index": 0,
                                                "label": "image"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    195,
                                                    198
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "IMAGE"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": [
                                                    193,
                                                    194
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "MASK"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "InspyrenetRembg"
                                        },
                                        "widgets_values": [
                                            "on"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 67,
                                        "type": "BNK_CLIPTextEncodeAdvanced",
                                        "pos": {
                                            "0": -5584,
                                            "1": 771
                                        },
                                        "size": {
                                            "0": 535.7697143554688,
                                            "1": 228.1288299560547
                                        },
                                        "flags": {},
                                        "order": 26,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 155,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    200
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "BNK_CLIPTextEncodeAdvanced"
                                        },
                                        "widgets_values": [
                                            "nsfw,ng_deepnegative_v1_75t,badhandv4,(worst quality:2),(low quality:2),(normal quality:2),lowres,watermark,monochrome,",
                                            "none",
                                            "A1111"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#322",
                                        "bgcolor": "#533"
                                    },
                                    {
                                        "id": 82,
                                        "type": "LoraLoader",
                                        "pos": {
                                            "0": -6370,
                                            "1": 831
                                        },
                                        "size": {
                                            "0": 600.0059204101562,
                                            "1": 179.4761505126953
                                        },
                                        "flags": {},
                                        "order": 23,
                                        "mode": 4,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 151,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 153,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [
                                                    165
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "CLIP",
                                                "type": "CLIP",
                                                "links": [
                                                    155,
                                                    166
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "LoraLoader"
                                        },
                                        "widgets_values": [
                                            "万物调节丨质感增强器_V1.0",
                                            0.2,
                                            1
                                        ],
                                        "_widget_cache_map": {
                                            "万物调节丨质感增强器_V1.0": {
                                                "name": "万物调节丨质感增强器_V1.0",
                                                "value": 1800476
                                            }
                                        }
                                    },
                                    {
                                        "id": 51,
                                        "type": "LoraLoader",
                                        "pos": {
                                            "0": -6369,
                                            "1": 626
                                        },
                                        "size": {
                                            "0": 597.9893188476562,
                                            "1": 168.38851928710938
                                        },
                                        "flags": {},
                                        "order": 20,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 82,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 83,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [
                                                    151
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "CLIP",
                                                "type": "CLIP",
                                                "links": [
                                                    153
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "LoraLoader"
                                        },
                                        "widgets_values": [
                                            "法式奶油风室内设计|French Cream Style _V1.0",
                                            0.8,
                                            1
                                        ],
                                        "_widget_cache_map": {
                                            "自然美妆场景_2.0": {
                                                "name": "自然美妆场景_2.0",
                                                "value": 1486402
                                            },
                                            "SDS_电商质感室内背景_1.0": {
                                                "name": "SDS_电商质感室内背景_1.0",
                                                "value": 622510
                                            },
                                            "3D电商模型_v1.1": {
                                                "name": "3D电商模型_v1.1",
                                                "value": 933741
                                            },
                                            "【梦幻】3D电商草地_3D电商草地V1.0": {
                                                "name": "【梦幻】3D电商草地_3D电商草地V1.0",
                                                "value": 989180
                                            },
                                            "电商森林场景-模型v2.0_电商森林场景V2.0": {
                                                "name": "电商森林场景-模型v2.0_电商森林场景V2.0",
                                                "value": 1133821
                                            },
                                            "mw_电商展台_1.0": {
                                                "name": "mw_电商展台_1.0",
                                                "value": 2225265
                                            },
                                            "zz_电商_小家电场景_zz_电商小家电场景v1.0": {
                                                "name": "zz_电商_小家电场景_zz_电商小家电场景v1.0",
                                                "value": 1149747
                                            },
                                            "【ai摄影】电商室内场景_v1.0": {
                                                "name": "【ai摄影】电商室内场景_v1.0",
                                                "value": "8475dd32102040b29eb09bfe15acbcd4"
                                            },
                                            "法式奶油风室内设计|French Cream Style _V1.0": {
                                                "name": "法式奶油风室内设计|French Cream Style _V1.0",
                                                "value": "a548e0959d814887ad81846aad9f1f3d"
                                            }
                                        }
                                    },
                                    {
                                        "id": 117,
                                        "type": "LoraLoader",
                                        "pos": {
                                            "0": -5291.8759765625,
                                            "1": -1146.2320556640625
                                        },
                                        "size": {
                                            "0": 597.9893188476562,
                                            "1": 168.38851928710938
                                        },
                                        "flags": {},
                                        "order": 2,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": null,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": null,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "CLIP",
                                                "type": "CLIP",
                                                "links": [],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "LoraLoader"
                                        },
                                        "widgets_values": [
                                            "【ai摄影】电商室内场景_v1.0",
                                            0.8,
                                            1
                                        ],
                                        "_widget_cache_map": {
                                            "自然美妆场景_2.0": {
                                                "name": "自然美妆场景_2.0",
                                                "value": 1486402
                                            },
                                            "SDS_电商质感室内背景_1.0": {
                                                "name": "SDS_电商质感室内背景_1.0",
                                                "value": 622510
                                            },
                                            "3D电商模型_v1.1": {
                                                "name": "3D电商模型_v1.1",
                                                "value": 933741
                                            },
                                            "【梦幻】3D电商草地_3D电商草地V1.0": {
                                                "name": "【梦幻】3D电商草地_3D电商草地V1.0",
                                                "value": 989180
                                            },
                                            "电商森林场景-模型v2.0_电商森林场景V2.0": {
                                                "name": "电商森林场景-模型v2.0_电商森林场景V2.0",
                                                "value": 1133821
                                            },
                                            "mw_电商展台_1.0": {
                                                "name": "mw_电商展台_1.0",
                                                "value": 2225265
                                            },
                                            "zz_电商_小家电场景_zz_电商小家电场景v1.0": {
                                                "name": "zz_电商_小家电场景_zz_电商小家电场景v1.0",
                                                "value": 1149747
                                            },
                                            "【ai摄影】电商室内场景_v1.0": {
                                                "name": "【ai摄影】电商室内场景_v1.0",
                                                "value": "8475dd32102040b29eb09bfe15acbcd4"
                                            }
                                        }
                                    },
                                    {
                                        "id": 118,
                                        "type": "BNK_CLIPTextEncodeAdvanced",
                                        "pos": {
                                            "0": -4664.5546875,
                                            "1": -1158.666748046875
                                        },
                                        "size": {
                                            "0": 537.7697143554688,
                                            "1": 324.9216003417969
                                        },
                                        "flags": {},
                                        "order": 3,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": null,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "BNK_CLIPTextEncodeAdvanced"
                                        },
                                        "widgets_values": [
                                            "product photography,indoor,indoors,book,no humans,chair,table,scenery,desk,clock,potted plant,",
                                            "none",
                                            "A1111"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#232",
                                        "bgcolor": "#353"
                                    },
                                    {
                                        "id": 47,
                                        "type": "CheckpointLoaderSimple",
                                        "pos": {
                                            "0": -6373,
                                            "1": 394
                                        },
                                        "size": {
                                            "0": 605.6746826171875,
                                            "1": 190.3218994140625
                                        },
                                        "flags": {},
                                        "order": 4,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [
                                                    82
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "CLIP",
                                                "type": "CLIP",
                                                "links": [
                                                    83
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "CLIP"
                                            },
                                            {
                                                "name": "VAE",
                                                "type": "VAE",
                                                "links": [
                                                    98,
                                                    109,
                                                    203
                                                ],
                                                "slot_index": 2,
                                                "shape": 3,
                                                "label": "VAE"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CheckpointLoaderSimple"
                                        },
                                        "widgets_values": [
                                            "majicMIX realistic 麦橘写实_v7"
                                        ],
                                        "_widget_cache_map": {
                                            "realisticVision V6.0 B1_V6.0 B1": {
                                                "name": "realisticVision V6.0 B1_V6.0 B1",
                                                "value": 575082
                                            },
                                            "麒麟-revAnimated_v122_V1.2.2": {
                                                "name": "麒麟-revAnimated_v122_V1.2.2",
                                                "value": 24357
                                            },
                                            "3Drendering电商展台三维渲染效果_v1.0": {
                                                "name": "3Drendering电商展台三维渲染效果_v1.0",
                                                "value": 108135
                                            },
                                            "动漫ReVAnimated_v1.1": {
                                                "name": "动漫ReVAnimated_v1.1",
                                                "value": 13
                                            },
                                            "Realistic Vision V5.1_V5.1": {
                                                "name": "Realistic Vision V5.1_V5.1",
                                                "value": 27957
                                            },
                                            "majicMIX realistic 麦橘写实_v7": {
                                                "name": "majicMIX realistic 麦橘写实_v7",
                                                "value": 125488
                                            }
                                        }
                                    },
                                    {
                                        "id": 115,
                                        "type": "Note",
                                        "pos": {
                                            "0": -5218.5546875,
                                            "1": -1280.6666259765625
                                        },
                                        "size": {
                                            "0": 421.5223388671875,
                                            "1": 58.47328186035156
                                        },
                                        "flags": {},
                                        "order": 5,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {},
                                        "widgets_values": [
                                            "LORA 触发词：product photography，indoor"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 84,
                                        "type": "Note",
                                        "pos": {
                                            "0": -6083,
                                            "1": -505
                                        },
                                        "size": {
                                            "0": 420.214599609375,
                                            "1": 305.5709228515625
                                        },
                                        "flags": {},
                                        "order": 6,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {
                                            "text": ""
                                        },
                                        "widgets_values": [
                                            "\n\n\n\n对于新手而言相对较好，只需要修改提示词、LORA、和ControlNet控制\n\n\n\n\n导入产品最好是透明底图和白底图\n\n注意事项：如果你的产品占画面80%以上那么背景只剩下20%，换出来的效果不美观，换了等于没换。产品画面占比自己调整到合适位置就行\n\n高清无损修复地址：https://www.liblib.art/modelinfo/a783762169f64cbfb1f38280e89b4472?from=personal_page   \n\n\n如果哩布上的LORA 没有满意的 可以支持定制。+微 1287723024"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 119,
                                        "type": "Note",
                                        "pos": {
                                            "0": -5591,
                                            "1": 249
                                        },
                                        "size": {
                                            "0": 524.7269287109375,
                                            "1": 107.9983901977539
                                        },
                                        "flags": {},
                                        "order": 7,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {},
                                        "widgets_values": [
                                            "LORA 触发词：French cream style，French light luxury style，French quiet style，\n                                   \n\n             法式奶油风格，      法式轻奢风格，              法式静谧风格。\n\n选择一个加上"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 108,
                                        "type": "Note",
                                        "pos": {
                                            "0": -3829,
                                            "1": 1803
                                        },
                                        "size": {
                                            "0": 233.57977294921875,
                                            "1": 177.59715270996094
                                        },
                                        "flags": {},
                                        "order": 8,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {},
                                        "widgets_values": [
                                            "往上调变暗   往下调变明亮\n\n 黑色阶和白色阶 依次增加10\n\n 比如 ： 黑色阶 85    +10 或者-10\n         中阶   0\n         白色阶 185   +10 或者-10\n\n\n    如果遇到报错 请调整中阶 数值 \n          \n\n"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 111,
                                        "type": "PreviewImage",
                                        "pos": {
                                            "0": -7015,
                                            "1": 823
                                        },
                                        "size": {
                                            "0": 431.5291748046875,
                                            "1": 302.4756164550781
                                        },
                                        "flags": {},
                                        "order": 30,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 195,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "PreviewImage"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 143,
                                        "type": "PreviewImage",
                                        "pos": {
                                            "0": -2708,
                                            "1": 524
                                        },
                                        "size": {
                                            "0": 461.9742126464844,
                                            "1": 495.30401611328125
                                        },
                                        "flags": {},
                                        "order": 42,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 225,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "PreviewImage"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 107,
                                        "type": "Image Levels Adjustment",
                                        "pos": {
                                            "0": -3840,
                                            "1": 1650
                                        },
                                        "size": {
                                            "0": 242.02175903320312,
                                            "1": 106
                                        },
                                        "flags": {},
                                        "order": 59,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 187,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    168
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Image Levels Adjustment"
                                        },
                                        "widgets_values": [
                                            80,
                                            120,
                                            180
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 92,
                                        "type": "SaveImage",
                                        "pos": {
                                            "0": -3288,
                                            "1": 1451
                                        },
                                        "size": {
                                            "0": 1125.478271484375,
                                            "1": 1476.2081298828125
                                        },
                                        "flags": {},
                                        "order": 60,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 168,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "SaveImage"
                                        },
                                        "widgets_values": [
                                            "ComfyUI"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 166,
                                        "type": "VAELoader",
                                        "pos": {
                                            "0": -1534,
                                            "1": 1310.0001220703125
                                        },
                                        "size": {
                                            "0": 222.2190704345703,
                                            "1": 58
                                        },
                                        "flags": {
                                            "collapsed": false
                                        },
                                        "order": 9,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "VAE",
                                                "type": "VAE",
                                                "links": [
                                                    269,
                                                    282
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "VAE"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAELoader",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            "ae.sft"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 167,
                                        "type": "DualCLIPLoader",
                                        "pos": {
                                            "0": -1127,
                                            "1": 1703.0001220703125
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 106
                                        },
                                        "flags": {},
                                        "order": 10,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "CLIP",
                                                "type": "CLIP",
                                                "links": [
                                                    270
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "DualCLIPLoader",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            "t5xxl_fp8_e4m3fn",
                                            "clip_l",
                                            "flux"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 169,
                                        "type": "KSamplerSelect",
                                        "pos": {
                                            "0": -363.9999084472656,
                                            "1": 1318.0001220703125
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 11,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "SAMPLER",
                                                "type": "SAMPLER",
                                                "links": [
                                                    278
                                                ],
                                                "shape": 3,
                                                "label": "采样器"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "KSamplerSelect",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            "euler"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 170,
                                        "type": "RandomNoise",
                                        "pos": {
                                            "0": -341.9999084472656,
                                            "1": 1734.0001220703125
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 82
                                        },
                                        "flags": {},
                                        "order": 12,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "NOISE",
                                                "type": "NOISE",
                                                "links": [
                                                    276
                                                ],
                                                "shape": 3,
                                                "label": "噪波生成"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "RandomNoise",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            898572418477618,
                                            "randomize"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 172,
                                        "type": "Note",
                                        "pos": {
                                            "0": -1759,
                                            "1": 1309.0001220703125
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 13,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {
                                            "text": ""
                                        },
                                        "widgets_values": [
                                            "Load VAE这里选择【ae.sft】"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 173,
                                        "type": "Note",
                                        "pos": {
                                            "0": -1763,
                                            "1": 1487.0001220703125
                                        },
                                        "size": {
                                            "0": 221.84483337402344,
                                            "1": 88.4504623413086
                                        },
                                        "flags": {},
                                        "order": 14,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {
                                            "text": ""
                                        },
                                        "widgets_values": [
                                            "UNETLoader这里需要先去Lib首页搜索并收藏Flux.1可在线运行的版本，然后进行选择\n\nweight_dtype选择为fp8_e4m3fn"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 174,
                                        "type": "Note",
                                        "pos": {
                                            "0": -1363,
                                            "1": 1700.0001220703125
                                        },
                                        "size": {
                                            "0": 216.59072875976562,
                                            "1": 80.25205993652344
                                        },
                                        "flags": {},
                                        "order": 15,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {
                                            "text": ""
                                        },
                                        "widgets_values": [
                                            "Clip_name1选择【t5xxl_fp8_e4m3fn】\nclip_name2选择【clip_l】\ntype选择【flux】"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 175,
                                        "type": "Note",
                                        "pos": {
                                            "0": -1178,
                                            "1": 1398.0001220703125
                                        },
                                        "size": {
                                            "0": 216.80252075195312,
                                            "1": 60.097049713134766
                                        },
                                        "flags": {},
                                        "order": 16,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {
                                            "text": ""
                                        },
                                        "widgets_values": [
                                            "需要改图片尺寸，只需更改height（高度）即可，宽度会按照原图比例自动缩放"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 176,
                                        "type": "Note",
                                        "pos": {
                                            "0": -575,
                                            "1": 1476.0001220703125
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 74.65654754638672
                                        },
                                        "flags": {},
                                        "order": 17,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [],
                                        "properties": {
                                            "text": ""
                                        },
                                        "widgets_values": [
                                            "右侧的denosie大小影响和原图的相似度，范围在0-1之间，越大和原图区别越大，建议设置在0.5-0.7之间"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#432",
                                        "bgcolor": "#653"
                                    },
                                    {
                                        "id": 178,
                                        "type": "ImageResize+",
                                        "pos": {
                                            "0": -942,
                                            "1": 1327.0001220703125
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 218
                                        },
                                        "flags": {},
                                        "order": 43,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 284,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    268
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "width",
                                                "type": "INT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "宽度"
                                            },
                                            {
                                                "name": "height",
                                                "type": "INT",
                                                "links": null,
                                                "shape": 3,
                                                "label": "高度"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageResize+",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            0,
                                            3200,
                                            "nearest",
                                            "keep proportion",
                                            "always",
                                            0
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 179,
                                        "type": "WD14Tagger|pysssss",
                                        "pos": {
                                            "0": -1678,
                                            "1": 1758.0001220703125
                                        },
                                        "size": {
                                            "0": 291.9637145996094,
                                            "1": 220
                                        },
                                        "flags": {},
                                        "order": 44,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 285,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "STRING",
                                                "type": "STRING",
                                                "links": [
                                                    271,
                                                    272,
                                                    273
                                                ],
                                                "slot_index": 0,
                                                "shape": 6,
                                                "label": "字符串"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "WD14Tagger|pysssss"
                                        },
                                        "widgets_values": [
                                            "wd-v1-4-vit-tagger-v2",
                                            0.35,
                                            0.85,
                                            false,
                                            false,
                                            ""
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 180,
                                        "type": "VAEEncode",
                                        "pos": {
                                            "0": -595,
                                            "1": 1322.0001220703125
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 46
                                        },
                                        "flags": {
                                            "collapsed": false
                                        },
                                        "order": 47,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "pixels",
                                                "type": "IMAGE",
                                                "link": 268,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 269,
                                                "label": "VAE"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "LATENT",
                                                "type": "LATENT",
                                                "links": [
                                                    280
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAEEncode",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 181,
                                        "type": "CLIPTextEncodeFlux",
                                        "pos": {
                                            "0": -1318,
                                            "1": 1854.0001220703125
                                        },
                                        "size": {
                                            "0": 432.5616149902344,
                                            "1": 284.4220886230469
                                        },
                                        "flags": {},
                                        "order": 48,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 270,
                                                "label": "CLIP"
                                            },
                                            {
                                                "name": "clip_l",
                                                "type": "STRING",
                                                "link": 271,
                                                "widget": {
                                                    "name": "clip_l"
                                                },
                                                "label": "CLIP_L"
                                            },
                                            {
                                                "name": "t5xxl",
                                                "type": "STRING",
                                                "link": 272,
                                                "widget": {
                                                    "name": "t5xxl"
                                                },
                                                "label": "T5XXL"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    275
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CLIPTextEncodeFlux",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            "(masterpiece, best qaulity:1.2),2girls and 1boy, asian, black hair, male, face mask, white nurse, in a laboratory, laboratory equipment, testicles, vials, beaker, test tubes, red liquid, tilted angle, moody lighting, science fiction, depth of field, film grain",
                                            "(masterpiece, best qaulity:1.2),2girls and 1boy, asian, black hair, male, face mask, white nurse, in a laboratory, laboratory equipment, testicles, vials, beaker, test tubes, red liquid, tilted angle, moody lighting, science fiction, depth of field, film grain",
                                            4
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 182,
                                        "type": "ShowText|pysssss",
                                        "pos": {
                                            "0": -1746,
                                            "1": 2053.000244140625
                                        },
                                        "size": {
                                            "0": 328.3868103027344,
                                            "1": 164.60366821289062
                                        },
                                        "flags": {},
                                        "order": 49,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "text",
                                                "type": "STRING",
                                                "link": 273,
                                                "widget": {
                                                    "name": "text"
                                                },
                                                "label": "文本"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "STRING",
                                                "type": "STRING",
                                                "links": null,
                                                "shape": 6,
                                                "label": "字符串"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ShowText|pysssss"
                                        },
                                        "widgets_values": [
                                            "",
                                            "(masterpiece, best qaulity:1.2),a serene night landscape with water lilies and moonlight, surrounded by fog and steam"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 183,
                                        "type": "BasicGuider",
                                        "pos": {
                                            "0": -330.9999084472656,
                                            "1": 1625.0001220703125
                                        },
                                        "size": {
                                            "0": 241.79998779296875,
                                            "1": 46
                                        },
                                        "flags": {
                                            "collapsed": false
                                        },
                                        "order": 51,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 274,
                                                "slot_index": 0,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "conditioning",
                                                "type": "CONDITIONING",
                                                "link": 275,
                                                "slot_index": 1,
                                                "label": "条件"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "GUIDER",
                                                "type": "GUIDER",
                                                "links": [
                                                    277
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "引导"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "BasicGuider",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 184,
                                        "type": "SamplerCustomAdvanced",
                                        "pos": {
                                            "0": 42.999969482421875,
                                            "1": 1399.0001220703125
                                        },
                                        "size": {
                                            "0": 236.74952697753906,
                                            "1": 376.5199279785156
                                        },
                                        "flags": {},
                                        "order": 53,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "noise",
                                                "type": "NOISE",
                                                "link": 276,
                                                "slot_index": 0,
                                                "label": "噪波生成"
                                            },
                                            {
                                                "name": "guider",
                                                "type": "GUIDER",
                                                "link": 277,
                                                "slot_index": 1,
                                                "label": "引导"
                                            },
                                            {
                                                "name": "sampler",
                                                "type": "SAMPLER",
                                                "link": 278,
                                                "slot_index": 2,
                                                "label": "采样器"
                                            },
                                            {
                                                "name": "sigmas",
                                                "type": "SIGMAS",
                                                "link": 279,
                                                "slot_index": 3,
                                                "label": "Sigmas"
                                            },
                                            {
                                                "name": "latent_image",
                                                "type": "LATENT",
                                                "link": 280,
                                                "slot_index": 4,
                                                "label": "Latent"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "output",
                                                "type": "LATENT",
                                                "links": [
                                                    281
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "输出"
                                            },
                                            {
                                                "name": "denoised_output",
                                                "type": "LATENT",
                                                "links": null,
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "降噪输出"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "SamplerCustomAdvanced",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 185,
                                        "type": "VAEDecode",
                                        "pos": {
                                            "0": 75.99996948242188,
                                            "1": 1300.0001220703125
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 46
                                        },
                                        "flags": {
                                            "collapsed": false
                                        },
                                        "order": 55,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "samples",
                                                "type": "LATENT",
                                                "link": 281,
                                                "label": "Latent"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 282,
                                                "label": "VAE"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    283
                                                ],
                                                "slot_index": 0,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAEDecode",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 186,
                                        "type": "SaveImage",
                                        "pos": {
                                            "0": -751.0369262695312,
                                            "1": 467.2388916015625
                                        },
                                        "size": {
                                            "0": 1040.1241455078125,
                                            "1": 724.7775268554688
                                        },
                                        "flags": {},
                                        "order": 57,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 283,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "SaveImage",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            "ComfyUI"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 57,
                                        "type": "VAEDecode",
                                        "pos": {
                                            "0": -3382,
                                            "1": 430
                                        },
                                        "size": {
                                            "0": 443.59619140625,
                                            "1": 98.41316986083984
                                        },
                                        "flags": {},
                                        "order": 40,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "samples",
                                                "type": "LATENT",
                                                "link": 128,
                                                "label": "Latent"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 109,
                                                "label": "VAE"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    188,
                                                    225,
                                                    284,
                                                    285
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAEDecode"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 168,
                                        "type": "UNETLoader",
                                        "pos": {
                                            "0": -1503,
                                            "1": 1494
                                        },
                                        "size": {
                                            "0": 300.0418395996094,
                                            "1": 82
                                        },
                                        "flags": {},
                                        "order": 18,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [
                                                    265,
                                                    274
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "UNETLoader",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            "基础算法_F.1",
                                            "fp8_e4m3fn"
                                        ],
                                        "_widget_cache_map": {
                                            "基础算法_F.1": {
                                                "name": "基础算法_F.1",
                                                "baseType": 19,
                                                "value": "412b427ddb674b4dbab9e5abd5ae6057"
                                            }
                                        },
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 177,
                                        "type": "BasicScheduler",
                                        "pos": {
                                            "0": -347.9999084472656,
                                            "1": 1469.0001220703125
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 106
                                        },
                                        "flags": {},
                                        "order": 21,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 265,
                                                "slot_index": 0,
                                                "label": "模型"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "SIGMAS",
                                                "type": "SIGMAS",
                                                "links": [
                                                    279
                                                ],
                                                "shape": 3,
                                                "label": "Sigmas"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "BasicScheduler",
                                            "ttNbgOverride": {
                                                "color": "#223",
                                                "bgcolor": "#335",
                                                "groupcolor": "#88A"
                                            }
                                        },
                                        "widgets_values": [
                                            "simple",
                                            20,
                                            0.5
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#223",
                                        "bgcolor": "#335"
                                    },
                                    {
                                        "id": 1,
                                        "type": "LoadImage",
                                        "pos": {
                                            "0": -7672,
                                            "1": 562
                                        },
                                        "size": {
                                            "0": 470.19439697265625,
                                            "1": 578.6854248046875
                                        },
                                        "flags": {},
                                        "order": 19,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    157
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "MASK",
                                                "type": "MASK",
                                                "links": null,
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "遮罩"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "LoadImage"
                                        },
                                        "widgets_values": [
                                            "202310191112344341.jpg",
                                            "image"
                                        ],
                                        "_widget_cache_map": {
                                            "9407109949768fb876816d0c951d8eb2915a79814017dab2375446c7dc091a57.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/9407109949768fb876816d0c951d8eb2915a79814017dab2375446c7dc091a57.png",
                                                "name": "9407109949768fb876816d0c951d8eb2915a79814017dab2375446c7dc091a57.png",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/9407109949768fb876816d0c951d8eb2915a79814017dab2375446c7dc091a57.png"
                                            },
                                            "微信图片_20240726215528.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/2bcc41b8f01a6ece719d80ddf01bfe676164b63bb9edd6610e93a373f45ac5d7.png",
                                                "name": "微信图片_20240726215528.png",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/2bcc41b8f01a6ece719d80ddf01bfe676164b63bb9edd6610e93a373f45ac5d7.png"
                                            },
                                            "微信图片_20240731224732.jpg": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/c6da61e03b682694bcf476d6c854cb24f9271b27b0676b7315abae2c6525ced9.jpg",
                                                "name": "微信图片_20240731224732.jpg",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/c6da61e03b682694bcf476d6c854cb24f9271b27b0676b7315abae2c6525ced9.jpg"
                                            },
                                            "微信图片_20240808173307.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/b0dd533c6f959e395db52dbdb01d4f744a89fd530a1ea32008a47b05e164eabe.png",
                                                "name": "微信图片_20240808173307.png",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/b0dd533c6f959e395db52dbdb01d4f744a89fd530a1ea32008a47b05e164eabe.png"
                                            },
                                            "未标题-1.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/5971a06eed8491d6a8bb08d6bc51b77b60d1047a1deaae91ac9c0acc103fa6b9.png",
                                                "name": "未标题-1.png",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/5971a06eed8491d6a8bb08d6bc51b77b60d1047a1deaae91ac9c0acc103fa6b9.png"
                                            },
                                            "999999.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/e2d45afcd555b84e9dd5d437b3c03a672c202ad48d0983119e91af7b3f614874.png",
                                                "name": "999999.png",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/e2d45afcd555b84e9dd5d437b3c03a672c202ad48d0983119e91af7b3f614874.png"
                                            },
                                            "微信图片_20240808173307111111111111111111111111111111111.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/8a2996383a2e256e5b08183984946b46ecd62378ec602f448d9b14e80fa19ab8.png",
                                                "name": "微信图片_20240808173307111111111111111111111111111111111.png",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/8a2996383a2e256e5b08183984946b46ecd62378ec602f448d9b14e80fa19ab8.png"
                                            },
                                            "4651.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/0a94f6af85126b0f1dd6afd7b77bc39da99f4d195e2b6fc33920cc779b5a5ceb.png",
                                                "name": "4651.png",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/0a94f6af85126b0f1dd6afd7b77bc39da99f4d195e2b6fc33920cc779b5a5ceb.png"
                                            },
                                            "output (1)1.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/29135e9e12fcee3dcb68b80f11befc49f599f25eb2e12a6d0a37f03c1d7ddb87.png",
                                                "name": "output (1)1.png",
                                                "url": "https://liblibai-tmp-image.vibrou.com/img/46987de339ac47e0965172f7ccd1b939/29135e9e12fcee3dcb68b80f11befc49f599f25eb2e12a6d0a37f03c1d7ddb87.png"
                                            },
                                            "透明11.png": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/6a0e4c07082306322b40c572d3818369766847302f023b487f5aba3c6c8949fa.png",
                                                "name": "透明11.png",
                                                "url": "https://liblibai-tmp-image.liblib.cloud/img/46987de339ac47e0965172f7ccd1b939/6a0e4c07082306322b40c572d3818369766847302f023b487f5aba3c6c8949fa.png"
                                            },
                                            "产品精修｜不锈钢电炒锅_3_修图师｜平行旅人_来自小红书网页版.jpg": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/1d9f69b66bc75e6b438c8bd8caec80471cad78cdd9afe680dbe5041f57abdc3a.jpg",
                                                "name": "产品精修｜不锈钢电炒锅_3_修图师｜平行旅人_来自小红书网页版.jpg",
                                                "url": "https://liblibai-tmp-image.liblib.cloud/img/46987de339ac47e0965172f7ccd1b939/1d9f69b66bc75e6b438c8bd8caec80471cad78cdd9afe680dbe5041f57abdc3a.jpg"
                                            },
                                            "梦中情锅！想把介个推给所有独居姐妹！！_1_大酥大酥_来自小红书网页版.jpg": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/a503e0793a4daf0903b1541fe463eb9e940ce7917ad19ef5e421d04bfac3aa2e.jpg",
                                                "name": "梦中情锅！想把介个推给所有独居姐妹！！_1_大酥大酥_来自小红书网页版.jpg",
                                                "url": "https://liblibai-tmp-image.liblib.cloud/img/46987de339ac47e0965172f7ccd1b939/a503e0793a4daf0903b1541fe463eb9e940ce7917ad19ef5e421d04bfac3aa2e.jpg"
                                            },
                                            "全网唯一让我愿意放弃手机、躺一整天沙发！_1_E CASA 億家居_来自小红书网页版.jpg": {
                                                "value": "img/46987de339ac47e0965172f7ccd1b939/f42f64110d89eabb2d87b3a3beee7d361884c7a2093b3001a888f8a1ccf7b542.jpg",
                                                "name": "全网唯一让我愿意放弃手机、躺一整天沙发！_1_E CASA 億家居_来自小红书网页版.jpg",
                                                "url": "https://liblibai-tmp-image.liblib.cloud/img/46987de339ac47e0965172f7ccd1b939/f42f64110d89eabb2d87b3a3beee7d361884c7a2093b3001a888f8a1ccf7b542.jpg"
                                            },
                                            "png.png": {
                                                "value": "img/2614a5b2defc497a84eb52a7d647ff2d/a1053366d041144eb2847cad7c4a315ab01d5a80be72088ca25b03019a514cc9.png",
                                                "name": "png.png",
                                                "url": "https://liblibai-tmp-image.liblib.cloud/img/2614a5b2defc497a84eb52a7d647ff2d/a1053366d041144eb2847cad7c4a315ab01d5a80be72088ca25b03019a514cc9.png",
                                                "width": 800,
                                                "height": 800
                                            },
                                            "白底图.jpg": {
                                                "value": "img/2614a5b2defc497a84eb52a7d647ff2d/c1698be5edc20efad4b5e12b11bfde7889b225b3a516685c092c59fe372cbfcd.jpg",
                                                "name": "白底图.jpg",
                                                "url": "https://liblibai-tmp-image.liblib.cloud/img/2614a5b2defc497a84eb52a7d647ff2d/c1698be5edc20efad4b5e12b11bfde7889b225b3a516685c092c59fe372cbfcd.jpg",
                                                "width": 978,
                                                "height": 1511
                                            },
                                            "202310191112344341.jpg": {
                                                "value": "img/9aef803a2e7b4d08b7efcd974a0570d6/935a48a8907ed8598a5586d33574c770b123946ba08982a6c780ab092a5c3e0e.jpg",
                                                "name": "202310191112344341.jpg",
                                                "url": "https://liblibai-tmp-image.liblib.cloud/img/9aef803a2e7b4d08b7efcd974a0570d6/935a48a8907ed8598a5586d33574c770b123946ba08982a6c780ab092a5c3e0e.jpg",
                                                "width": 1200,
                                                "height": 1200
                                            }
                                        }
                                    },
                                    {
                                        "id": 66,
                                        "type": "BNK_CLIPTextEncodeAdvanced",
                                        "pos": {
                                            "0": -5586,
                                            "1": 408
                                        },
                                        "size": {
                                            "0": 537.7697143554688,
                                            "1": 324.9216003417969
                                        },
                                        "flags": {},
                                        "order": 27,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 166,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    199
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "BNK_CLIPTextEncodeAdvanced"
                                        },
                                        "widgets_values": [
                                            "Dining chairs, Nordic style, spacious restaurant, top view",
                                            "none",
                                            "A1111"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#232",
                                        "bgcolor": "#353"
                                    }
                                ],
                                "links": [
                                    [
                                        82,
                                        47,
                                        0,
                                        51,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        83,
                                        47,
                                        1,
                                        51,
                                        1,
                                        "CLIP"
                                    ],
                                    [
                                        98,
                                        47,
                                        2,
                                        55,
                                        1,
                                        "VAE"
                                    ],
                                    [
                                        101,
                                        45,
                                        0,
                                        55,
                                        4,
                                        "BRMODEL"
                                    ],
                                    [
                                        104,
                                        55,
                                        0,
                                        56,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        105,
                                        55,
                                        1,
                                        56,
                                        1,
                                        "CONDITIONING"
                                    ],
                                    [
                                        106,
                                        55,
                                        2,
                                        56,
                                        2,
                                        "CONDITIONING"
                                    ],
                                    [
                                        109,
                                        47,
                                        2,
                                        57,
                                        1,
                                        "VAE"
                                    ],
                                    [
                                        112,
                                        58,
                                        0,
                                        55,
                                        3,
                                        "MASK"
                                    ],
                                    [
                                        128,
                                        56,
                                        0,
                                        57,
                                        0,
                                        "LATENT"
                                    ],
                                    [
                                        151,
                                        51,
                                        0,
                                        82,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        153,
                                        51,
                                        1,
                                        82,
                                        1,
                                        "CLIP"
                                    ],
                                    [
                                        155,
                                        82,
                                        1,
                                        67,
                                        0,
                                        "CLIP"
                                    ],
                                    [
                                        156,
                                        55,
                                        3,
                                        56,
                                        3,
                                        "LATENT"
                                    ],
                                    [
                                        157,
                                        1,
                                        0,
                                        88,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        159,
                                        88,
                                        0,
                                        55,
                                        2,
                                        "IMAGE"
                                    ],
                                    [
                                        165,
                                        82,
                                        0,
                                        55,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        166,
                                        82,
                                        1,
                                        66,
                                        0,
                                        "CLIP"
                                    ],
                                    [
                                        168,
                                        107,
                                        0,
                                        92,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        169,
                                        93,
                                        0,
                                        94,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        170,
                                        93,
                                        0,
                                        95,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        171,
                                        94,
                                        0,
                                        96,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        172,
                                        95,
                                        0,
                                        96,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        173,
                                        96,
                                        0,
                                        97,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        174,
                                        95,
                                        0,
                                        98,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        175,
                                        97,
                                        0,
                                        98,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        176,
                                        99,
                                        0,
                                        100,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        177,
                                        99,
                                        0,
                                        101,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        178,
                                        100,
                                        0,
                                        102,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        179,
                                        101,
                                        0,
                                        102,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        180,
                                        102,
                                        0,
                                        103,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        181,
                                        101,
                                        0,
                                        104,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        182,
                                        103,
                                        0,
                                        104,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        183,
                                        104,
                                        0,
                                        105,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        184,
                                        98,
                                        0,
                                        105,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        185,
                                        101,
                                        0,
                                        106,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        186,
                                        105,
                                        0,
                                        106,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        187,
                                        106,
                                        0,
                                        107,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        188,
                                        57,
                                        0,
                                        99,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        189,
                                        88,
                                        0,
                                        93,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        190,
                                        109,
                                        0,
                                        105,
                                        2,
                                        "IMAGE"
                                    ],
                                    [
                                        192,
                                        88,
                                        0,
                                        110,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        193,
                                        110,
                                        1,
                                        58,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        194,
                                        110,
                                        1,
                                        109,
                                        0,
                                        "MASK"
                                    ],
                                    [
                                        195,
                                        110,
                                        0,
                                        111,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        196,
                                        112,
                                        0,
                                        113,
                                        2,
                                        "CONTROL_NET"
                                    ],
                                    [
                                        197,
                                        114,
                                        0,
                                        113,
                                        4,
                                        "IMAGE"
                                    ],
                                    [
                                        198,
                                        110,
                                        0,
                                        114,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        199,
                                        66,
                                        0,
                                        113,
                                        0,
                                        "CONDITIONING"
                                    ],
                                    [
                                        200,
                                        67,
                                        0,
                                        113,
                                        1,
                                        "CONDITIONING"
                                    ],
                                    [
                                        201,
                                        113,
                                        0,
                                        55,
                                        5,
                                        "CONDITIONING"
                                    ],
                                    [
                                        202,
                                        113,
                                        1,
                                        55,
                                        6,
                                        "CONDITIONING"
                                    ],
                                    [
                                        203,
                                        47,
                                        2,
                                        113,
                                        3,
                                        "VAE"
                                    ],
                                    [
                                        225,
                                        57,
                                        0,
                                        143,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        265,
                                        168,
                                        0,
                                        177,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        268,
                                        178,
                                        0,
                                        180,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        269,
                                        166,
                                        0,
                                        180,
                                        1,
                                        "VAE"
                                    ],
                                    [
                                        270,
                                        167,
                                        0,
                                        181,
                                        0,
                                        "CLIP"
                                    ],
                                    [
                                        271,
                                        179,
                                        0,
                                        181,
                                        1,
                                        "STRING"
                                    ],
                                    [
                                        272,
                                        179,
                                        0,
                                        181,
                                        2,
                                        "STRING"
                                    ],
                                    [
                                        273,
                                        179,
                                        0,
                                        182,
                                        0,
                                        "STRING"
                                    ],
                                    [
                                        274,
                                        168,
                                        0,
                                        183,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        275,
                                        181,
                                        0,
                                        183,
                                        1,
                                        "CONDITIONING"
                                    ],
                                    [
                                        276,
                                        170,
                                        0,
                                        184,
                                        0,
                                        "NOISE"
                                    ],
                                    [
                                        277,
                                        183,
                                        0,
                                        184,
                                        1,
                                        "GUIDER"
                                    ],
                                    [
                                        278,
                                        169,
                                        0,
                                        184,
                                        2,
                                        "SAMPLER"
                                    ],
                                    [
                                        279,
                                        177,
                                        0,
                                        184,
                                        3,
                                        "SIGMAS"
                                    ],
                                    [
                                        280,
                                        180,
                                        0,
                                        184,
                                        4,
                                        "LATENT"
                                    ],
                                    [
                                        281,
                                        184,
                                        0,
                                        185,
                                        0,
                                        "LATENT"
                                    ],
                                    [
                                        282,
                                        166,
                                        0,
                                        185,
                                        1,
                                        "VAE"
                                    ],
                                    [
                                        283,
                                        185,
                                        0,
                                        186,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        284,
                                        57,
                                        0,
                                        178,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        285,
                                        57,
                                        0,
                                        179,
                                        0,
                                        "IMAGE"
                                    ]
                                ],
                                "groups": [
                                    {
                                        "title": "下面默认 的是 大型的 比如沙发之类的",
                                        "bounding": [
                                            -5412,
                                            -513,
                                            1695,
                                            146
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 100,
                                        "flags": {}
                                    },
                                    {
                                        "title": "小家具类的换这个👇比如座椅板凳类的",
                                        "bounding": [
                                            -5358,
                                            -1482,
                                            1739,
                                            690
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 100,
                                        "flags": {}
                                    },
                                    {
                                        "title": "室内家具产品换背景",
                                        "bounding": [
                                            -7961,
                                            -182,
                                            6672,
                                            3201
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 300,
                                        "flags": {}
                                    },
                                    {
                                        "title": "👇如果出图产品有变形请把这个打开",
                                        "bounding": [
                                            -4906,
                                            132,
                                            573,
                                            51
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 35,
                                        "flags": {}
                                    },
                                    {
                                        "title": "上传的产品最好是白底图或者透明底图",
                                        "bounding": [
                                            -7865,
                                            1227,
                                            1034,
                                            81
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 60,
                                        "flags": {}
                                    },
                                    {
                                        "title": "产品上传区",
                                        "bounding": [
                                            -7727,
                                            370,
                                            596,
                                            844
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 100,
                                        "flags": {}
                                    },
                                    {
                                        "title": "ControlNet控制",
                                        "bounding": [
                                            -4903,
                                            282,
                                            544,
                                            741
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 24,
                                        "flags": {}
                                    },
                                    {
                                        "title": "右键点击下面这个框，选择启用/忽略框内节点",
                                        "bounding": [
                                            -4902,
                                            199,
                                            526,
                                            74
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 24,
                                        "flags": {}
                                    },
                                    {
                                        "title": "👇使用前请查看",
                                        "bounding": [
                                            -6075,
                                            -640,
                                            392,
                                            97
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 40,
                                        "flags": {}
                                    }
                                ],
                                "config": {},
                                "extra": {
                                    "ds": {
                                        "scale": 0.6588450000000009,
                                        "offset": [
                                            7244.6789597081515,
                                            -216.96387470134334
                                        ]
                                    },
                                    "0246.VERSION": [
                                        0,
                                        0,
                                        4
                                    ],
                                    "groupNodes": {
                                        "1": {
                                            "nodes": [
                                                {
                                                    "id": -1,
                                                    "type": "VAELoader",
                                                    "pos": {
                                                        "0": -335.9631042480469,
                                                        "1": 2287.76123046875
                                                    },
                                                    "size": {
                                                        "0": 222.2190704345703,
                                                        "1": 58
                                                    },
                                                    "flags": {
                                                        "collapsed": false
                                                    },
                                                    "order": 10,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [
                                                        {
                                                            "name": "VAE",
                                                            "type": "VAE",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "VAE"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "VAELoader",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        "ae.sft"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 0
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "DualCLIPLoader",
                                                    "pos": {
                                                        "0": 71.03689575195312,
                                                        "1": 2680.76123046875
                                                    },
                                                    "size": {
                                                        "0": 315,
                                                        "1": 106
                                                    },
                                                    "flags": {},
                                                    "order": 11,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [
                                                        {
                                                            "name": "CLIP",
                                                            "type": "CLIP",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "CLIP"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "DualCLIPLoader",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        "t5xxl_fp8_e4m3fn",
                                                        "clip_l",
                                                        "flux"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 1
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "UNETLoader",
                                                    "pos": {
                                                        "0": -304.9631042480469,
                                                        "1": 2471.76123046875
                                                    },
                                                    "size": {
                                                        "0": 300.0418395996094,
                                                        "1": 82
                                                    },
                                                    "flags": {},
                                                    "order": 12,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [
                                                        {
                                                            "name": "MODEL",
                                                            "type": "MODEL",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "模型"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "UNETLoader",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        "None",
                                                        "fp8_e4m3fn"
                                                    ],
                                                    "_widget_cache_map": {
                                                        "基础算法_F.1": {
                                                            "name": "基础算法_F.1",
                                                            "value": "412b427ddb674b4dbab9e5abd5ae6057"
                                                        }
                                                    },
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 2
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "KSamplerSelect",
                                                    "pos": {
                                                        "0": 834.0369873046875,
                                                        "1": 2295.76123046875
                                                    },
                                                    "size": {
                                                        "0": 315,
                                                        "1": 58
                                                    },
                                                    "flags": {},
                                                    "order": 13,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [
                                                        {
                                                            "name": "SAMPLER",
                                                            "type": "SAMPLER",
                                                            "links": [],
                                                            "shape": 3,
                                                            "label": "采样器"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "KSamplerSelect",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        "euler"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 3
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "RandomNoise",
                                                    "pos": {
                                                        "0": 856.0369873046875,
                                                        "1": 2711.76123046875
                                                    },
                                                    "size": {
                                                        "0": 315,
                                                        "1": 82
                                                    },
                                                    "flags": {},
                                                    "order": 14,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [
                                                        {
                                                            "name": "NOISE",
                                                            "type": "NOISE",
                                                            "links": [],
                                                            "shape": 3,
                                                            "label": "噪波生成"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "RandomNoise",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        400619173292716,
                                                        "randomize"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 4
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "LoadImage",
                                                    "pos": {
                                                        "0": -591.9630737304688,
                                                        "1": 1417.7611083984375
                                                    },
                                                    "size": {
                                                        "0": 1003.9461059570312,
                                                        "1": 755.7870483398438
                                                    },
                                                    "flags": {},
                                                    "order": 15,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [
                                                        {
                                                            "name": "IMAGE",
                                                            "type": "IMAGE",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "图像"
                                                        },
                                                        {
                                                            "name": "MASK",
                                                            "type": "MASK",
                                                            "links": null,
                                                            "slot_index": 1,
                                                            "shape": 3,
                                                            "label": "遮罩"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "LoadImage",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        "output (2).png",
                                                        "image"
                                                    ],
                                                    "_widget_cache_map": {
                                                        "output-(6).jpg": {
                                                            "value": "img/42b80e5cbc794d8f9e09a399e9574c97/950cbb8eb1dd83021518066e5d82bf064904e7312be335575241282bead9a477.jpg",
                                                            "name": "output-(6).jpg",
                                                            "url": "https://liblibai-tmp-image.liblib.cloud/img/42b80e5cbc794d8f9e09a399e9574c97/950cbb8eb1dd83021518066e5d82bf064904e7312be335575241282bead9a477.jpg"
                                                        },
                                                        "output (3).png": {
                                                            "value": "img/2614a5b2defc497a84eb52a7d647ff2d/0093401bd3f53a1ea8b43ac16204df4f94beced86ad61fc596685222bc979d1a.png",
                                                            "name": "output (3).png",
                                                            "url": "https://liblibai-tmp-image.liblib.cloud/img/2614a5b2defc497a84eb52a7d647ff2d/0093401bd3f53a1ea8b43ac16204df4f94beced86ad61fc596685222bc979d1a.png"
                                                        },
                                                        "output (2).png": {
                                                            "value": "img/2614a5b2defc497a84eb52a7d647ff2d/6a86819a9c0eebb2dc8b4cea97def13a868a3896c3528d0257dd549ecd2db780.png",
                                                            "name": "output (2).png",
                                                            "url": "https://liblibai-tmp-image.liblib.cloud/img/2614a5b2defc497a84eb52a7d647ff2d/6a86819a9c0eebb2dc8b4cea97def13a868a3896c3528d0257dd549ecd2db780.png"
                                                        }
                                                    },
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 5
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "Note",
                                                    "pos": {
                                                        "0": -560.9630737304688,
                                                        "1": 2286.76123046875
                                                    },
                                                    "size": [
                                                        210,
                                                        58
                                                    ],
                                                    "flags": {},
                                                    "order": 16,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [],
                                                    "properties": {
                                                        "text": ""
                                                    },
                                                    "widgets_values": [
                                                        "Load VAE这里选择【ae.sft】"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#432",
                                                    "bgcolor": "#653",
                                                    "index": 6
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "Note",
                                                    "pos": {
                                                        "0": -564.9630737304688,
                                                        "1": 2464.76123046875
                                                    },
                                                    "size": [
                                                        221.84483337402344,
                                                        88.4504623413086
                                                    ],
                                                    "flags": {},
                                                    "order": 17,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [],
                                                    "properties": {
                                                        "text": ""
                                                    },
                                                    "widgets_values": [
                                                        "UNETLoader这里需要先去Lib首页搜索并收藏Flux.1可在线运行的版本，然后进行选择\n\nweight_dtype选择为fp8_e4m3fn"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#432",
                                                    "bgcolor": "#653",
                                                    "index": 7
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "Note",
                                                    "pos": {
                                                        "0": -164.96310424804688,
                                                        "1": 2677.76123046875
                                                    },
                                                    "size": [
                                                        216.59072875976562,
                                                        80.25205993652344
                                                    ],
                                                    "flags": {},
                                                    "order": 18,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [],
                                                    "properties": {
                                                        "text": ""
                                                    },
                                                    "widgets_values": [
                                                        "Clip_name1选择【t5xxl_fp8_e4m3fn】\nclip_name2选择【clip_l】\ntype选择【flux】"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#432",
                                                    "bgcolor": "#653",
                                                    "index": 8
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "Note",
                                                    "pos": {
                                                        "0": 20.036895751953125,
                                                        "1": 2375.76123046875
                                                    },
                                                    "size": [
                                                        216.80252075195312,
                                                        60.097049713134766
                                                    ],
                                                    "flags": {},
                                                    "order": 19,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [],
                                                    "properties": {
                                                        "text": ""
                                                    },
                                                    "widgets_values": [
                                                        "需要改图片尺寸，只需更改height（高度）即可，宽度会按照原图比例自动缩放"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#432",
                                                    "bgcolor": "#653",
                                                    "index": 9
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "Note",
                                                    "pos": {
                                                        "0": 623.036865234375,
                                                        "1": 2453.76123046875
                                                    },
                                                    "size": [
                                                        210,
                                                        74.65654754638672
                                                    ],
                                                    "flags": {},
                                                    "order": 20,
                                                    "mode": 0,
                                                    "inputs": [],
                                                    "outputs": [],
                                                    "properties": {
                                                        "text": ""
                                                    },
                                                    "widgets_values": [
                                                        "右侧的denosie大小影响和原图的相似度，范围在0-1之间，越大和原图区别越大，建议设置在0.5-0.7之间"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#432",
                                                    "bgcolor": "#653",
                                                    "index": 10
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "BasicScheduler",
                                                    "pos": {
                                                        "0": 850.0369873046875,
                                                        "1": 2446.76123046875
                                                    },
                                                    "size": {
                                                        "0": 315,
                                                        "1": 106
                                                    },
                                                    "flags": {},
                                                    "order": 23,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "model",
                                                            "type": "MODEL",
                                                            "link": null,
                                                            "slot_index": 0,
                                                            "label": "模型"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "SIGMAS",
                                                            "type": "SIGMAS",
                                                            "links": [],
                                                            "shape": 3,
                                                            "label": "Sigmas"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "BasicScheduler",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        "simple",
                                                        20,
                                                        0.4
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 11
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "ImageResize+",
                                                    "pos": {
                                                        "0": 256.0368957519531,
                                                        "1": 2304.76123046875
                                                    },
                                                    "size": {
                                                        "0": 315,
                                                        "1": 218
                                                    },
                                                    "flags": {},
                                                    "order": 24,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "image",
                                                            "type": "IMAGE",
                                                            "link": null,
                                                            "label": "图像"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "IMAGE",
                                                            "type": "IMAGE",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "图像"
                                                        },
                                                        {
                                                            "name": "width",
                                                            "type": "INT",
                                                            "links": null,
                                                            "shape": 3,
                                                            "label": "宽度"
                                                        },
                                                        {
                                                            "name": "height",
                                                            "type": "INT",
                                                            "links": null,
                                                            "shape": 3,
                                                            "label": "高度"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "ImageResize+",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        0,
                                                        3200,
                                                        "nearest",
                                                        "keep proportion",
                                                        "always",
                                                        0
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 12
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "WD14Tagger|pysssss",
                                                    "pos": {
                                                        "0": -479.9631042480469,
                                                        "1": 2735.76123046875
                                                    },
                                                    "size": {
                                                        "0": 291.9637145996094,
                                                        "1": 220
                                                    },
                                                    "flags": {},
                                                    "order": 25,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "image",
                                                            "type": "IMAGE",
                                                            "link": null,
                                                            "label": "图像"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "STRING",
                                                            "type": "STRING",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 6,
                                                            "label": "字符串"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "WD14Tagger|pysssss"
                                                    },
                                                    "widgets_values": [
                                                        "wd-v1-4-vit-tagger-v2",
                                                        0.35,
                                                        0.85,
                                                        false,
                                                        false,
                                                        ""
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "index": 13
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "VAEEncode",
                                                    "pos": {
                                                        "0": 603.036865234375,
                                                        "1": 2299.76123046875
                                                    },
                                                    "size": {
                                                        "0": 210,
                                                        "1": 46
                                                    },
                                                    "flags": {
                                                        "collapsed": false
                                                    },
                                                    "order": 29,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "pixels",
                                                            "type": "IMAGE",
                                                            "link": null,
                                                            "label": "图像"
                                                        },
                                                        {
                                                            "name": "vae",
                                                            "type": "VAE",
                                                            "link": null,
                                                            "label": "VAE"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "LATENT",
                                                            "type": "LATENT",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "Latent"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "VAEEncode",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 14
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "CLIPTextEncodeFlux",
                                                    "pos": {
                                                        "0": -119.96310424804688,
                                                        "1": 2831.76123046875
                                                    },
                                                    "size": {
                                                        "0": 432.5616149902344,
                                                        "1": 284.4220886230469
                                                    },
                                                    "flags": {},
                                                    "order": 30,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "clip",
                                                            "type": "CLIP",
                                                            "link": null,
                                                            "label": "CLIP"
                                                        },
                                                        {
                                                            "name": "clip_l",
                                                            "type": "STRING",
                                                            "link": null,
                                                            "widget": {
                                                                "name": "clip_l"
                                                            },
                                                            "label": "CLIP_L"
                                                        },
                                                        {
                                                            "name": "t5xxl",
                                                            "type": "STRING",
                                                            "link": null,
                                                            "widget": {
                                                                "name": "t5xxl"
                                                            },
                                                            "label": "T5XXL"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "CONDITIONING",
                                                            "type": "CONDITIONING",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "条件"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "CLIPTextEncodeFlux",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        "(masterpiece, best qaulity:1.2),2girls and 1boy, asian, black hair, male, face mask, white nurse, in a laboratory, laboratory equipment, testicles, vials, beaker, test tubes, red liquid, tilted angle, moody lighting, science fiction, depth of field, film grain",
                                                        "(masterpiece, best qaulity:1.2),2girls and 1boy, asian, black hair, male, face mask, white nurse, in a laboratory, laboratory equipment, testicles, vials, beaker, test tubes, red liquid, tilted angle, moody lighting, science fiction, depth of field, film grain",
                                                        4
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 15
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "ShowText|pysssss",
                                                    "pos": {
                                                        "0": -547.9630737304688,
                                                        "1": 3030.76123046875
                                                    },
                                                    "size": [
                                                        328.3868103027344,
                                                        164.60366821289062
                                                    ],
                                                    "flags": {},
                                                    "order": 31,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "text",
                                                            "type": "STRING",
                                                            "link": null,
                                                            "widget": {
                                                                "name": "text"
                                                            },
                                                            "label": "文本"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "STRING",
                                                            "type": "STRING",
                                                            "links": null,
                                                            "shape": 6,
                                                            "label": "字符串"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "ShowText|pysssss"
                                                    },
                                                    "widgets_values": [
                                                        "",
                                                        "(masterpiece, best qaulity:1.2),a serene night landscape with water lilies and moonlight, surrounded by fog and steam"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "index": 16
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "BasicGuider",
                                                    "pos": {
                                                        "0": 867.0369873046875,
                                                        "1": 2602.76123046875
                                                    },
                                                    "size": {
                                                        "0": 241.79998779296875,
                                                        "1": 46
                                                    },
                                                    "flags": {
                                                        "collapsed": false
                                                    },
                                                    "order": 40,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "model",
                                                            "type": "MODEL",
                                                            "link": null,
                                                            "slot_index": 0,
                                                            "label": "模型"
                                                        },
                                                        {
                                                            "name": "conditioning",
                                                            "type": "CONDITIONING",
                                                            "link": null,
                                                            "slot_index": 1,
                                                            "label": "条件"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "GUIDER",
                                                            "type": "GUIDER",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "引导"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "BasicGuider",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 17
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "SamplerCustomAdvanced",
                                                    "pos": {
                                                        "0": 1241.036865234375,
                                                        "1": 2376.76123046875
                                                    },
                                                    "size": {
                                                        "0": 236.74952697753906,
                                                        "1": 376.5199279785156
                                                    },
                                                    "flags": {},
                                                    "order": 43,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "noise",
                                                            "type": "NOISE",
                                                            "link": null,
                                                            "slot_index": 0,
                                                            "label": "噪波生成"
                                                        },
                                                        {
                                                            "name": "guider",
                                                            "type": "GUIDER",
                                                            "link": null,
                                                            "slot_index": 1,
                                                            "label": "引导"
                                                        },
                                                        {
                                                            "name": "sampler",
                                                            "type": "SAMPLER",
                                                            "link": null,
                                                            "slot_index": 2,
                                                            "label": "采样器"
                                                        },
                                                        {
                                                            "name": "sigmas",
                                                            "type": "SIGMAS",
                                                            "link": null,
                                                            "slot_index": 3,
                                                            "label": "Sigmas"
                                                        },
                                                        {
                                                            "name": "latent_image",
                                                            "type": "LATENT",
                                                            "link": null,
                                                            "slot_index": 4,
                                                            "label": "Latent"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "output",
                                                            "type": "LATENT",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "shape": 3,
                                                            "label": "输出"
                                                        },
                                                        {
                                                            "name": "denoised_output",
                                                            "type": "LATENT",
                                                            "links": null,
                                                            "slot_index": 1,
                                                            "shape": 3,
                                                            "label": "降噪输出"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "SamplerCustomAdvanced",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 18
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "VAEDecode",
                                                    "pos": {
                                                        "0": 1274.036865234375,
                                                        "1": 2277.76123046875
                                                    },
                                                    "size": {
                                                        "0": 210,
                                                        "1": 46
                                                    },
                                                    "flags": {
                                                        "collapsed": false
                                                    },
                                                    "order": 46,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "samples",
                                                            "type": "LATENT",
                                                            "link": null,
                                                            "label": "Latent"
                                                        },
                                                        {
                                                            "name": "vae",
                                                            "type": "VAE",
                                                            "link": null,
                                                            "label": "VAE"
                                                        }
                                                    ],
                                                    "outputs": [
                                                        {
                                                            "name": "IMAGE",
                                                            "type": "IMAGE",
                                                            "links": [],
                                                            "slot_index": 0,
                                                            "label": "图像"
                                                        }
                                                    ],
                                                    "properties": {
                                                        "Node name for S&R": "VAEDecode",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 19
                                                },
                                                {
                                                    "id": -1,
                                                    "type": "SaveImage",
                                                    "pos": {
                                                        "0": 446.9999694824219,
                                                        "1": 1445
                                                    },
                                                    "size": {
                                                        "0": 1040.1241455078125,
                                                        "1": 724.7775268554688
                                                    },
                                                    "flags": {},
                                                    "order": 49,
                                                    "mode": 0,
                                                    "inputs": [
                                                        {
                                                            "name": "images",
                                                            "type": "IMAGE",
                                                            "link": null,
                                                            "label": "图像"
                                                        }
                                                    ],
                                                    "outputs": [],
                                                    "properties": {
                                                        "Node name for S&R": "SaveImage",
                                                        "ttNbgOverride": {
                                                            "color": "#223",
                                                            "bgcolor": "#335",
                                                            "groupcolor": "#88A"
                                                        }
                                                    },
                                                    "widgets_values": [
                                                        "ComfyUI"
                                                    ],
                                                    "_widget_cache_map": {},
                                                    "color": "#223",
                                                    "bgcolor": "#335",
                                                    "index": 20
                                                }
                                            ],
                                            "links": [
                                                [
                                                    2,
                                                    0,
                                                    11,
                                                    0,
                                                    168,
                                                    "MODEL"
                                                ],
                                                [
                                                    5,
                                                    0,
                                                    12,
                                                    0,
                                                    171,
                                                    "IMAGE"
                                                ],
                                                [
                                                    5,
                                                    0,
                                                    13,
                                                    0,
                                                    171,
                                                    "IMAGE"
                                                ],
                                                [
                                                    12,
                                                    0,
                                                    14,
                                                    0,
                                                    178,
                                                    "IMAGE"
                                                ],
                                                [
                                                    0,
                                                    0,
                                                    14,
                                                    1,
                                                    166,
                                                    "VAE"
                                                ],
                                                [
                                                    1,
                                                    0,
                                                    15,
                                                    0,
                                                    167,
                                                    "CLIP"
                                                ],
                                                [
                                                    13,
                                                    0,
                                                    15,
                                                    1,
                                                    179,
                                                    "STRING"
                                                ],
                                                [
                                                    13,
                                                    0,
                                                    15,
                                                    2,
                                                    179,
                                                    "STRING"
                                                ],
                                                [
                                                    13,
                                                    0,
                                                    16,
                                                    0,
                                                    179,
                                                    "STRING"
                                                ],
                                                [
                                                    2,
                                                    0,
                                                    17,
                                                    0,
                                                    168,
                                                    "MODEL"
                                                ],
                                                [
                                                    15,
                                                    0,
                                                    17,
                                                    1,
                                                    181,
                                                    "CONDITIONING"
                                                ],
                                                [
                                                    4,
                                                    0,
                                                    18,
                                                    0,
                                                    170,
                                                    "NOISE"
                                                ],
                                                [
                                                    17,
                                                    0,
                                                    18,
                                                    1,
                                                    183,
                                                    "GUIDER"
                                                ],
                                                [
                                                    3,
                                                    0,
                                                    18,
                                                    2,
                                                    169,
                                                    "SAMPLER"
                                                ],
                                                [
                                                    11,
                                                    0,
                                                    18,
                                                    3,
                                                    177,
                                                    "SIGMAS"
                                                ],
                                                [
                                                    14,
                                                    0,
                                                    18,
                                                    4,
                                                    180,
                                                    "LATENT"
                                                ],
                                                [
                                                    18,
                                                    0,
                                                    19,
                                                    0,
                                                    184,
                                                    "LATENT"
                                                ],
                                                [
                                                    0,
                                                    0,
                                                    19,
                                                    1,
                                                    166,
                                                    "VAE"
                                                ],
                                                [
                                                    19,
                                                    0,
                                                    20,
                                                    0,
                                                    185,
                                                    "IMAGE"
                                                ]
                                            ],
                                            "external": []
                                        }
                                    }
                                },
                                "version": 0.4,
                                "seed_widgets": {
                                    "56": 0,
                                    "170": 0
                                },
                                "widget_idx_map": {
                                    "56": {
                                        "seed": 0,
                                        "sampler_name": 4,
                                        "scheduler": 5
                                    },
                                    "169": {
                                        "sampler_name": 0
                                    },
                                    "170": {
                                        "noise_seed": 0
                                    },
                                    "177": {
                                        "scheduler": 0
                                    }
                                }
                            }
                        }
                    },
                    "source_workflow": "4804ec1e21444371b9a67e6d18db0f34"
                },
                "adetailerEnable": false
            }
        },
    }, {
        id: "a7a09d249a9c43b6a11f82586ee8c93b",
        name: "convert-to-sketch",
        title: "一键转草图",
        cost: 20000,
        cost_type: "amount",
        demo_images: [
            "/disk/workflow/thumb_202112081118583921.jpg",
            "/disk/workflow/6095758-8c31fc0e9dc431cf8b2d2d61d6ede77ad1492492a43998994f03cb4ac8b256d8.webp",
            "/disk/workflow/6095757-d3e4f4731864b7e7efca4c236cc7e8a99f1cd376a8224478a799aee406f3dc1f.webp"
        ],
        descript: `🎉 一键成草图 🌈

🌟 无论是场景图、空间图、产品图、人物图再此流程跑完后，都会生成一张线稿草图、一张铅笔画草图

🛠️ 简单两步走：

选择图片：上传您需要转化的图片。
点击变换：一键操作，见证奇迹发生！`,
        build_params: (imageUrlA: string) => {
            return {
                "source": 0,
                "generateType": 19,
                "taskQueuePriority": 2,
                "frontCustomerReq": {
                    "tabType": "comfy",
                    "conAndSegAndGen": "gen"
                },
                "comfyUI": {
                    "prompt": {
                        "12": {
                            "inputs": {
                                "coarse": "disable",
                                "resolution": 1024,
                                "image": [
                                    "110",
                                    0
                                ]
                            },
                            "class_type": "LineArtPreprocessor"
                        },
                        "13": {
                            "inputs": {
                                "images": [
                                    "12",
                                    0
                                ]
                            },
                            "class_type": "PreviewImage"
                        },
                        "14": {
                            "inputs": {
                                "image": [
                                    "12",
                                    0
                                ]
                            },
                            "class_type": "ImageInvert"
                        },
                        "24": {
                            "inputs": {
                                "seed": 891554441277820,
                                "steps": 10,
                                "cfg": 7,
                                "sampler_name": "lcm",
                                "scheduler": "karras",
                                "denoise": 0.5,
                                "model": [
                                    "25",
                                    0
                                ],
                                "positive": [
                                    "49",
                                    0
                                ],
                                "negative": [
                                    "30",
                                    0
                                ],
                                "latent_image": [
                                    "26",
                                    0
                                ]
                            },
                            "class_type": "KSampler"
                        },
                        "25": {
                            "inputs": {
                                "ckpt_name": "d5e19d1d8b093037d400f32a4093b502"
                            },
                            "class_type": "CheckpointLoaderSimple"
                        },
                        "26": {
                            "inputs": {
                                "pixels": [
                                    "14",
                                    0
                                ],
                                "vae": [
                                    "28",
                                    0
                                ]
                            },
                            "class_type": "VAEEncode"
                        },
                        "28": {
                            "inputs": {
                                "vae_name": "klF8Anime2VAE_klF8Anime2VAE.ckpt"
                            },
                            "class_type": "VAELoader"
                        },
                        "29": {
                            "inputs": {
                                "text": "abstract, coal croquis, pen sketch, dynamic sketching, bold use of line, light gray, intense close-ups, colorless, white background",
                                "clip": [
                                    "25",
                                    1
                                ]
                            },
                            "class_type": "CLIPTextEncode"
                        },
                        "30": {
                            "inputs": {
                                "text": "",
                                "clip": [
                                    "25",
                                    1
                                ]
                            },
                            "class_type": "CLIPTextEncode"
                        },
                        "31": {
                            "inputs": {
                                "samples": [
                                    "24",
                                    0
                                ],
                                "vae": [
                                    "28",
                                    0
                                ]
                            },
                            "class_type": "VAEDecode"
                        },
                        "44": {
                            "inputs": {
                                "strength": 0.7000000000000001,
                                "conditioning": [
                                    "66",
                                    0
                                ],
                                "control_net": [
                                    "45",
                                    0
                                ],
                                "image": [
                                    "46",
                                    0
                                ]
                            },
                            "class_type": "ControlNetApply"
                        },
                        "45": {
                            "inputs": {
                                "control_net_name": "control_v11p_sd15_lineart"
                            },
                            "class_type": "ControlNetLoader"
                        },
                        "46": {
                            "inputs": {
                                "resolution": 1024,
                                "image": [
                                    "110",
                                    0
                                ]
                            },
                            "class_type": "Zoe-DepthMapPreprocessor"
                        },
                        "47": {
                            "inputs": {
                                "images": [
                                    "46",
                                    0
                                ]
                            },
                            "class_type": "PreviewImage"
                        },
                        "49": {
                            "inputs": {
                                "strength": 0.5,
                                "conditioning": [
                                    "44",
                                    0
                                ],
                                "control_net": [
                                    "50",
                                    0
                                ],
                                "image": [
                                    "12",
                                    0
                                ]
                            },
                            "class_type": "ControlNetApply"
                        },
                        "50": {
                            "inputs": {
                                "control_net_name": "control_v11p_sd15_lineart"
                            },
                            "class_type": "ControlNetLoader"
                        },
                        "56": {
                            "inputs": {
                                "seed": 1096278206933960,
                                "steps": 30,
                                "cfg": 7,
                                "sampler_name": "euler_ancestral",
                                "scheduler": "karras",
                                "denoise": 0.6,
                                "model": [
                                    "25",
                                    0
                                ],
                                "positive": [
                                    "49",
                                    0
                                ],
                                "negative": [
                                    "30",
                                    0
                                ],
                                "latent_image": [
                                    "26",
                                    0
                                ]
                            },
                            "class_type": "KSampler"
                        },
                        "57": {
                            "inputs": {
                                "samples": [
                                    "56",
                                    0
                                ],
                                "vae": [
                                    "28",
                                    0
                                ]
                            },
                            "class_type": "VAEDecode"
                        },
                        "59": {
                            "inputs": {
                                "blend_percentage": 0.2,
                                "image_a": [
                                    "31",
                                    0
                                ],
                                "image_b": [
                                    "57",
                                    0
                                ]
                            },
                            "class_type": "Image Blend"
                        },
                        "66": {
                            "inputs": {
                                "strength": 1,
                                "noise_augmentation": 0,
                                "conditioning": [
                                    "29",
                                    0
                                ],
                                "clip_vision_output": [
                                    "67",
                                    0
                                ]
                            },
                            "class_type": "unCLIPConditioning"
                        },
                        "67": {
                            "inputs": {
                                "clip_vision": [
                                    "68",
                                    0
                                ],
                                "image": [
                                    "110",
                                    0
                                ]
                            },
                            "class_type": "CLIPVisionEncode"
                        },
                        "68": {
                            "inputs": {
                                "clip_name": "CLIP-ViT-bigG-14-laion2B-39B-b160k"
                            },
                            "class_type": "CLIPVisionLoader"
                        },
                        "74": {
                            "inputs": {
                                "images": [
                                    "14",
                                    0
                                ]
                            },
                            "class_type": "PreviewImage"
                        },
                        "75": {
                            "inputs": {
                                "images": [
                                    "59",
                                    0
                                ]
                            },
                            "class_type": "PreviewImage"
                        },
                        "110": {
                            "inputs": {
                                "url": [
                                    "111",
                                    0
                                ]
                            },
                            "class_type": "Load Image From Url (mtb)"
                        },
                        "111": {
                            "inputs": {
                                "string": "http://www.yorolook.com/upload/202206/24/thumb_202206241139020711.jpg"
                            },
                            "class_type": "Simple String"
                        },
                        "112": {
                            "inputs": {
                                "images": [
                                    "110",
                                    0
                                ]
                            },
                            "class_type": "PreviewImage"
                        }
                    },
                    "extra_data": {
                        "extra_pnginfo": {
                            "workflow": {
                                "last_node_id": 112,
                                "last_link_id": 185,
                                "nodes": [
                                    {
                                        "id": 44,
                                        "type": "ControlNetApply",
                                        "pos": {
                                            "0": 5047.81591796875,
                                            "1": 97.36500549316406
                                        },
                                        "size": {
                                            "0": 317.4000244140625,
                                            "1": 98
                                        },
                                        "flags": {},
                                        "order": 17,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "conditioning",
                                                "type": "CONDITIONING",
                                                "link": 114,
                                                "label": "条件"
                                            },
                                            {
                                                "name": "control_net",
                                                "type": "CONTROL_NET",
                                                "link": 57,
                                                "label": "ControlNet"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 59,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    115
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ControlNetApply"
                                        },
                                        "widgets_values": [
                                            0.7000000000000001
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 49,
                                        "type": "ControlNetApply",
                                        "pos": {
                                            "0": 5400.81591796875,
                                            "1": 95.36500549316406
                                        },
                                        "size": {
                                            "0": 317.4000244140625,
                                            "1": 98
                                        },
                                        "flags": {},
                                        "order": 20,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "conditioning",
                                                "type": "CONDITIONING",
                                                "link": 115,
                                                "label": "条件"
                                            },
                                            {
                                                "name": "control_net",
                                                "type": "CONTROL_NET",
                                                "link": 68,
                                                "label": "ControlNet"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 67,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    116,
                                                    117
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ControlNetApply"
                                        },
                                        "widgets_values": [
                                            0.5
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 12,
                                        "type": "LineArtPreprocessor",
                                        "pos": {
                                            "0": 5403.81591796875,
                                            "1": -42.63499450683594
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 82
                                        },
                                        "flags": {},
                                        "order": 11,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 184,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    12,
                                                    13,
                                                    67
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "LineArtPreprocessor"
                                        },
                                        "widgets_values": [
                                            "disable",
                                            1024
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 30,
                                        "type": "CLIPTextEncode",
                                        "pos": {
                                            "0": 4543.98974609375,
                                            "1": 258.55877685546875
                                        },
                                        "size": {
                                            "0": 410.90325927734375,
                                            "1": 138.87640380859375
                                        },
                                        "flags": {},
                                        "order": 7,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 30,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    32,
                                                    79
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CLIPTextEncode"
                                        },
                                        "widgets_values": [
                                            ""
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#322",
                                        "bgcolor": "#533"
                                    },
                                    {
                                        "id": 66,
                                        "type": "unCLIPConditioning",
                                        "pos": {
                                            "0": 4573,
                                            "1": -133
                                        },
                                        "size": {
                                            "0": 393,
                                            "1": 102
                                        },
                                        "flags": {},
                                        "order": 13,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "conditioning",
                                                "type": "CONDITIONING",
                                                "link": 105,
                                                "label": "条件"
                                            },
                                            {
                                                "name": "clip_vision_output",
                                                "type": "CLIP_VISION_OUTPUT",
                                                "link": 108,
                                                "label": "CLIP视觉输出"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    114
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "unCLIPConditioning"
                                        },
                                        "widgets_values": [
                                            1,
                                            0
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 46,
                                        "type": "Zoe-DepthMapPreprocessor",
                                        "pos": {
                                            "0": 5039.5947265625,
                                            "1": -119.57890319824219
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 10,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 183,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    59,
                                                    61
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Zoe-DepthMapPreprocessor"
                                        },
                                        "widgets_values": [
                                            1024
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 14,
                                        "type": "ImageInvert",
                                        "pos": {
                                            "0": 5771.5947265625,
                                            "1": -45.57891845703125
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 26
                                        },
                                        "flags": {},
                                        "order": 16,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 13,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    129,
                                                    130
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ImageInvert"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 26,
                                        "type": "VAEEncode",
                                        "pos": {
                                            "0": 5759.5947265625,
                                            "1": 67.42110443115234
                                        },
                                        "size": {
                                            "0": 210,
                                            "1": 46
                                        },
                                        "flags": {},
                                        "order": 18,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "pixels",
                                                "type": "IMAGE",
                                                "link": 129,
                                                "label": "图像"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 26,
                                                "label": "VAE"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "LATENT",
                                                "type": "LATENT",
                                                "links": [
                                                    103,
                                                    104
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAEEncode"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 24,
                                        "type": "KSampler",
                                        "pos": {
                                            "0": 6105.568359375,
                                            "1": 97.96682739257812
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 474
                                        },
                                        "flags": {},
                                        "order": 21,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 95,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "link": 116,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "link": 32,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "latent_image",
                                                "type": "LATENT",
                                                "link": 103,
                                                "label": "Latent"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "LATENT",
                                                "type": "LATENT",
                                                "links": [
                                                    33
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "KSampler"
                                        },
                                        "widgets_values": [
                                            891554441277820,
                                            "fixed",
                                            10,
                                            7,
                                            "lcm",
                                            "karras",
                                            0.5
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 56,
                                        "type": "KSampler",
                                        "pos": {
                                            "0": 6514,
                                            "1": 84
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 474
                                        },
                                        "flags": {},
                                        "order": 22,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "model",
                                                "type": "MODEL",
                                                "link": 81,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "positive",
                                                "type": "CONDITIONING",
                                                "link": 117,
                                                "label": "正面条件"
                                            },
                                            {
                                                "name": "negative",
                                                "type": "CONDITIONING",
                                                "link": 79,
                                                "label": "负面条件"
                                            },
                                            {
                                                "name": "latent_image",
                                                "type": "LATENT",
                                                "link": 104,
                                                "label": "Latent"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "LATENT",
                                                "type": "LATENT",
                                                "links": [
                                                    82
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "Latent"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "KSampler"
                                        },
                                        "widgets_values": [
                                            1096278206933960,
                                            "fixed",
                                            30,
                                            7,
                                            "euler_ancestral",
                                            "karras",
                                            0.6
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 31,
                                        "type": "VAEDecode",
                                        "pos": {
                                            "0": 6098,
                                            "1": -133
                                        },
                                        "size": {
                                            "0": 277.70404052734375,
                                            "1": 58.78683853149414
                                        },
                                        "flags": {},
                                        "order": 23,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "samples",
                                                "type": "LATENT",
                                                "link": 33,
                                                "label": "Latent"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 34,
                                                "slot_index": 1,
                                                "label": "VAE"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    85
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAEDecode"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 57,
                                        "type": "VAEDecode",
                                        "pos": {
                                            "0": 6514,
                                            "1": -14
                                        },
                                        "size": {
                                            "0": 303.666748046875,
                                            "1": 46
                                        },
                                        "flags": {},
                                        "order": 24,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "samples",
                                                "type": "LATENT",
                                                "link": 82,
                                                "label": "Latent"
                                            },
                                            {
                                                "name": "vae",
                                                "type": "VAE",
                                                "link": 83,
                                                "slot_index": 1,
                                                "label": "VAE"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    86
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAEDecode"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 25,
                                        "type": "CheckpointLoaderSimple",
                                        "pos": {
                                            "0": 4107,
                                            "1": 100
                                        },
                                        "size": {
                                            "0": 364.7502746582031,
                                            "1": 98
                                        },
                                        "flags": {},
                                        "order": 0,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "MODEL",
                                                "type": "MODEL",
                                                "links": [
                                                    81,
                                                    95
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "模型"
                                            },
                                            {
                                                "name": "CLIP",
                                                "type": "CLIP",
                                                "links": [
                                                    29,
                                                    30
                                                ],
                                                "slot_index": 1,
                                                "shape": 3,
                                                "label": "CLIP"
                                            },
                                            {
                                                "name": "VAE",
                                                "type": "VAE",
                                                "links": null,
                                                "shape": 3,
                                                "label": "VAE"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CheckpointLoaderSimple"
                                        },
                                        "widgets_values": [
                                            "真实感epiCRealism_newAge"
                                        ],
                                        "_widget_cache_map": {
                                            "真实感epiCRealism_newAge": {
                                                "name": "真实感epiCRealism_newAge",
                                                "value": "d5e19d1d8b093037d400f32a4093b502"
                                            }
                                        }
                                    },
                                    {
                                        "id": 67,
                                        "type": "CLIPVisionEncode",
                                        "pos": {
                                            "0": 4111,
                                            "1": 0
                                        },
                                        "size": {
                                            "0": 380.4000244140625,
                                            "1": 46
                                        },
                                        "flags": {},
                                        "order": 9,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip_vision",
                                                "type": "CLIP_VISION",
                                                "link": 106,
                                                "label": "CLIP视觉"
                                            },
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "link": 182,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CLIP_VISION_OUTPUT",
                                                "type": "CLIP_VISION_OUTPUT",
                                                "links": [
                                                    108
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "CLIP视觉输出"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CLIPVisionEncode"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 50,
                                        "type": "ControlNetLoader",
                                        "pos": {
                                            "0": 5397.81591796875,
                                            "1": -152.63491821289062
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 1,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "CONTROL_NET",
                                                "type": "CONTROL_NET",
                                                "links": [
                                                    68
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "ControlNet"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ControlNetLoader"
                                        },
                                        "widgets_values": [
                                            "control_v11p_sd15_lineart"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 28,
                                        "type": "VAELoader",
                                        "pos": {
                                            "0": 6084,
                                            "1": -18
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 2,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "VAE",
                                                "type": "VAE",
                                                "links": [
                                                    26,
                                                    34,
                                                    83
                                                ],
                                                "slot_index": 0,
                                                "shape": 3
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "VAELoader"
                                        },
                                        "widgets_values": [
                                            "klF8Anime2VAE_klF8Anime2VAE.ckpt"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 45,
                                        "type": "ControlNetLoader",
                                        "pos": {
                                            "0": 5017.81591796875,
                                            "1": -12.634993553161621
                                        },
                                        "size": {
                                            "0": 362.5013122558594,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 3,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "CONTROL_NET",
                                                "type": "CONTROL_NET",
                                                "links": [
                                                    57
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "ControlNet"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "ControlNetLoader"
                                        },
                                        "widgets_values": [
                                            "control_v11p_sd15_lineart"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 68,
                                        "type": "CLIPVisionLoader",
                                        "pos": {
                                            "0": 4122.98974609375,
                                            "1": -113.44120788574219
                                        },
                                        "size": {
                                            "0": 373.0825500488281,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 4,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "CLIP_VISION",
                                                "type": "CLIP_VISION",
                                                "links": [
                                                    106
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "CLIP视觉"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CLIPVisionLoader"
                                        },
                                        "widgets_values": [
                                            "CLIP-ViT-bigG-14-laion2B-39B-b160k"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 74,
                                        "type": "PreviewImage",
                                        "pos": {
                                            "0": 5009,
                                            "1": -984
                                        },
                                        "size": {
                                            "0": 493.5013122558594,
                                            "1": 654.8648071289062
                                        },
                                        "flags": {},
                                        "order": 19,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 130,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "PreviewImage"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 75,
                                        "type": "PreviewImage",
                                        "pos": {
                                            "0": 5578.240234375,
                                            "1": -975.1630249023438
                                        },
                                        "size": {
                                            "0": 485.4352111816406,
                                            "1": 657.603271484375
                                        },
                                        "flags": {},
                                        "order": 26,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 131,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "PreviewImage"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 59,
                                        "type": "Image Blend",
                                        "pos": {
                                            "0": 6579,
                                            "1": -166
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 78
                                        },
                                        "flags": {},
                                        "order": 25,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "image_a",
                                                "type": "IMAGE",
                                                "link": 85
                                            },
                                            {
                                                "name": "image_b",
                                                "type": "IMAGE",
                                                "link": 86
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "image",
                                                "type": "IMAGE",
                                                "links": [
                                                    131
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Image Blend"
                                        },
                                        "widgets_values": [
                                            0.2
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 29,
                                        "type": "CLIPTextEncode",
                                        "pos": {
                                            "0": 4552.98974609375,
                                            "1": 48.55878829956055
                                        },
                                        "size": {
                                            "0": 398.6822509765625,
                                            "1": 160.4467315673828
                                        },
                                        "flags": {},
                                        "order": 6,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "clip",
                                                "type": "CLIP",
                                                "link": 29,
                                                "label": "CLIP"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "CONDITIONING",
                                                "type": "CONDITIONING",
                                                "links": [
                                                    105
                                                ],
                                                "slot_index": 0,
                                                "shape": 3,
                                                "label": "条件"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "CLIPTextEncode"
                                        },
                                        "widgets_values": [
                                            "abstract, coal croquis, pen sketch, dynamic sketching, bold use of line, light gray, intense close-ups, colorless, white background"
                                        ],
                                        "_widget_cache_map": {},
                                        "color": "#232",
                                        "bgcolor": "#353"
                                    },
                                    {
                                        "id": 111,
                                        "type": "Simple String",
                                        "pos": {
                                            "0": 4481,
                                            "1": -914
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {
                                            "pinned": true
                                        },
                                        "order": 5,
                                        "mode": 0,
                                        "inputs": [],
                                        "outputs": [
                                            {
                                                "name": "STRING",
                                                "type": "STRING",
                                                "links": [
                                                    181
                                                ],
                                                "slot_index": 0,
                                                "label": "字符串"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Simple String"
                                        },
                                        "widgets_values": [
                                            "http://www.yorolook.com/upload/202206/24/thumb_202206241139020711.jpg"
                                        ],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 47,
                                        "type": "PreviewImage",
                                        "pos": {
                                            "0": 5045,
                                            "1": 321
                                        },
                                        "size": {
                                            "0": 305.3112487792969,
                                            "1": 365.9240417480469
                                        },
                                        "flags": {},
                                        "order": 14,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 61,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "PreviewImage"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 13,
                                        "type": "PreviewImage",
                                        "pos": {
                                            "0": 5452,
                                            "1": 317
                                        },
                                        "size": {
                                            "0": 246.80438232421875,
                                            "1": 388.2752685546875
                                        },
                                        "flags": {},
                                        "order": 15,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 12,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "PreviewImage"
                                        },
                                        "widgets_values": [],
                                        "_widget_cache_map": {}
                                    },
                                    {
                                        "id": 112,
                                        "type": "PreviewImage",
                                        "pos": {
                                            "0": 4491,
                                            "1": -684
                                        },
                                        "size": {
                                            "0": 246.80438232421875,
                                            "1": 388.2752685546875
                                        },
                                        "flags": {},
                                        "order": 12,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "images",
                                                "type": "IMAGE",
                                                "link": 185,
                                                "label": "图像"
                                            }
                                        ],
                                        "outputs": [],
                                        "properties": {
                                            "Node name for S&R": "PreviewImage"
                                        }
                                    },
                                    {
                                        "id": 110,
                                        "type": "Load Image From Url (mtb)",
                                        "pos": {
                                            "0": 4484,
                                            "1": -807
                                        },
                                        "size": {
                                            "0": 315,
                                            "1": 58
                                        },
                                        "flags": {},
                                        "order": 8,
                                        "mode": 0,
                                        "inputs": [
                                            {
                                                "name": "url",
                                                "type": "STRING",
                                                "link": 181,
                                                "widget": {
                                                    "name": "url"
                                                },
                                                "label": "URL"
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "name": "IMAGE",
                                                "type": "IMAGE",
                                                "links": [
                                                    182,
                                                    183,
                                                    184,
                                                    185
                                                ],
                                                "slot_index": 0,
                                                "label": "图像"
                                            }
                                        ],
                                        "properties": {
                                            "Node name for S&R": "Load Image From Url (mtb)"
                                        },
                                        "widgets_values": [
                                            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Example.jpg/800px-Example.jpg"
                                        ],
                                        "_widget_cache_map": {}
                                    }
                                ],
                                "links": [
                                    [
                                        12,
                                        12,
                                        0,
                                        13,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        13,
                                        12,
                                        0,
                                        14,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        26,
                                        28,
                                        0,
                                        26,
                                        1,
                                        "VAE"
                                    ],
                                    [
                                        29,
                                        25,
                                        1,
                                        29,
                                        0,
                                        "CLIP"
                                    ],
                                    [
                                        30,
                                        25,
                                        1,
                                        30,
                                        0,
                                        "CLIP"
                                    ],
                                    [
                                        32,
                                        30,
                                        0,
                                        24,
                                        2,
                                        "CONDITIONING"
                                    ],
                                    [
                                        33,
                                        24,
                                        0,
                                        31,
                                        0,
                                        "LATENT"
                                    ],
                                    [
                                        34,
                                        28,
                                        0,
                                        31,
                                        1,
                                        "VAE"
                                    ],
                                    [
                                        57,
                                        45,
                                        0,
                                        44,
                                        1,
                                        "CONTROL_NET"
                                    ],
                                    [
                                        59,
                                        46,
                                        0,
                                        44,
                                        2,
                                        "IMAGE"
                                    ],
                                    [
                                        61,
                                        46,
                                        0,
                                        47,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        67,
                                        12,
                                        0,
                                        49,
                                        2,
                                        "IMAGE"
                                    ],
                                    [
                                        68,
                                        50,
                                        0,
                                        49,
                                        1,
                                        "CONTROL_NET"
                                    ],
                                    [
                                        79,
                                        30,
                                        0,
                                        56,
                                        2,
                                        "CONDITIONING"
                                    ],
                                    [
                                        81,
                                        25,
                                        0,
                                        56,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        82,
                                        56,
                                        0,
                                        57,
                                        0,
                                        "LATENT"
                                    ],
                                    [
                                        83,
                                        28,
                                        0,
                                        57,
                                        1,
                                        "VAE"
                                    ],
                                    [
                                        85,
                                        31,
                                        0,
                                        59,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        86,
                                        57,
                                        0,
                                        59,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        95,
                                        25,
                                        0,
                                        24,
                                        0,
                                        "MODEL"
                                    ],
                                    [
                                        103,
                                        26,
                                        0,
                                        24,
                                        3,
                                        "LATENT"
                                    ],
                                    [
                                        104,
                                        26,
                                        0,
                                        56,
                                        3,
                                        "LATENT"
                                    ],
                                    [
                                        105,
                                        29,
                                        0,
                                        66,
                                        0,
                                        "CONDITIONING"
                                    ],
                                    [
                                        106,
                                        68,
                                        0,
                                        67,
                                        0,
                                        "CLIP_VISION"
                                    ],
                                    [
                                        108,
                                        67,
                                        0,
                                        66,
                                        1,
                                        "CLIP_VISION_OUTPUT"
                                    ],
                                    [
                                        114,
                                        66,
                                        0,
                                        44,
                                        0,
                                        "CONDITIONING"
                                    ],
                                    [
                                        115,
                                        44,
                                        0,
                                        49,
                                        0,
                                        "CONDITIONING"
                                    ],
                                    [
                                        116,
                                        49,
                                        0,
                                        24,
                                        1,
                                        "CONDITIONING"
                                    ],
                                    [
                                        117,
                                        49,
                                        0,
                                        56,
                                        1,
                                        "CONDITIONING"
                                    ],
                                    [
                                        129,
                                        14,
                                        0,
                                        26,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        130,
                                        14,
                                        0,
                                        74,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        131,
                                        59,
                                        0,
                                        75,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        181,
                                        111,
                                        0,
                                        110,
                                        0,
                                        "STRING"
                                    ],
                                    [
                                        182,
                                        110,
                                        0,
                                        67,
                                        1,
                                        "IMAGE"
                                    ],
                                    [
                                        183,
                                        110,
                                        0,
                                        46,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        184,
                                        110,
                                        0,
                                        12,
                                        0,
                                        "IMAGE"
                                    ],
                                    [
                                        185,
                                        110,
                                        0,
                                        112,
                                        0,
                                        "IMAGE"
                                    ]
                                ],
                                "groups": [
                                    {
                                        "title": "Controlnet",
                                        "bounding": [
                                            5007,
                                            -259,
                                            1017,
                                            1126
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 24,
                                        "flags": {}
                                    },
                                    {
                                        "title": "模型和提示词",
                                        "bounding": [
                                            4055,
                                            -256,
                                            941,
                                            698
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 24,
                                        "flags": {}
                                    },
                                    {
                                        "title": "输入图片",
                                        "bounding": [
                                            4395,
                                            -1084,
                                            569,
                                            798
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 24,
                                        "flags": {}
                                    },
                                    {
                                        "title": "2次采样",
                                        "bounding": [
                                            6073,
                                            -251,
                                            871,
                                            1119
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 24,
                                        "flags": {}
                                    },
                                    {
                                        "title": "铅笔画",
                                        "bounding": [
                                            5568,
                                            -1081,
                                            497,
                                            795
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 24,
                                        "flags": {}
                                    },
                                    {
                                        "title": "线稿",
                                        "bounding": [
                                            4972,
                                            -1083,
                                            581,
                                            795
                                        ],
                                        "color": "#3f789e",
                                        "font_size": 24,
                                        "flags": {}
                                    }
                                ],
                                "config": {},
                                "extra": {
                                    "ds": {
                                        "scale": 0.724729500000003,
                                        "offset": [
                                            -4301.4906250580125,
                                            1086.7469753413302
                                        ]
                                    },
                                    "0246.VERSION": [
                                        0,
                                        0,
                                        4
                                    ]
                                },
                                "version": 0.4,
                                "seed_widgets": {
                                    "24": 0,
                                    "56": 0
                                },
                                "widget_idx_map": {
                                    "24": {
                                        "seed": 0,
                                        "sampler_name": 4,
                                        "scheduler": 5
                                    },
                                    "56": {
                                        "seed": 0,
                                        "sampler_name": 4,
                                        "scheduler": 5
                                    }
                                }
                            }
                        }
                    },
                    "source_workflow": "a7a09d249a9c43b6a11f82586ee8c93b"
                },
                "adetailerEnable": false
            }
        },
        sort_images: () => {
            const sortNodes = [{
                nodeId: "112",
                title: "原图",
            }, {
                nodeId: "47",
                title: "景深",
            }, {
                nodeId: "13",
                title: "底片",
            }, {
                nodeId: "75",
                title: "铅笔画",
            }, {
                nodeId: "74",
                title: "线稿",
            }]
        }
    }
]

export const config = {
    name: "workflow",
    models,
}
convert hdr to sdr to make the video have the same color.

```sh
ffmpeg -ss 00:00:34.11 -i "IMG_0093 (2).MOV" \
-vf "zscale=t=linear:npl=250,format=gbrpf32le,zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,format=yuv420p" \
-c:v hevc_nvenc \
-rc vbr \
-cq 18 \
-preset p7 \
-profile:v main \
-c:a copy \
1_output.mp4
```

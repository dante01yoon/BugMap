"""Illustrative map asset for the Figma concept; not geographic data."""
import math, random, struct, zlib
from pathlib import Path
random.seed(21)
W,H,S=390,844,2
w,h=W*S,H*S
pix=bytearray(bytes.fromhex('e6ebe6')*(w*h))
svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="390" height="844" fill="#e6ebe6"/>']
def poly(pts,col):
    svg.append('<polygon points="'+' '.join(f'{x:.1f},{y:.1f}' for x,y in pts)+f'" fill="{col}"/>')
    pts=[(x*S,y*S) for x,y in pts]; rgb=bytes.fromhex(col[1:])
    for y in range(max(0,int(min(p[1] for p in pts))),min(h,int(max(p[1] for p in pts))+1)):
        xs=[]
        for a,b in zip(pts,pts[1:]+pts[:1]):
            if (a[1]<=y+.5<b[1]) or (b[1]<=y+.5<a[1]):
                xs.append(a[0]+(y+.5-a[1])*(b[0]-a[0])/(b[1]-a[1]))
        xs.sort()
        for a,b in zip(xs[::2],xs[1::2]):
            lo,hi=max(0,int(a)),min(w,int(b)+1)
            if hi>lo: pix[(y*w+lo)*3:(y*w+hi)*3]=rgb*(hi-lo)
def stroke(pts,col,width):
    svg.append('<polyline points="'+' '.join(f'{x:.1f},{y:.1f}' for x,y in pts)+f'" fill="none" stroke="{col}" stroke-width="{width}" stroke-linecap="round" stroke-linejoin="round"/>')
    rgb=bytes.fromhex(col[1:]); r=width*S/2
    for (ax,ay),(bx,by) in zip(pts,pts[1:]):
        ax*=S;ay*=S;bx*=S;by*=S;dx=bx-ax;dy=by-ay;l=dx*dx+dy*dy
        for y in range(max(0,int(min(ay,by)-r)),min(h,int(max(ay,by)+r)+1)):
            for x in range(max(0,int(min(ax,bx)-r)),min(w,int(max(ax,bx)+r)+1)):
                t=max(0,min(1,((x-ax)*dx+(y-ay)*dy)/l)) if l else 0
                if (x-ax-t*dx)**2+(y-ay-t*dy)**2<=r*r:
                    i=(y*w+x)*3;pix[i:i+3]=rgb
def clip(p,a,b,c):
    out=[]
    for v,u in zip(p,p[1:]+p[:1]):
        fv=a*v[0]+b*v[1]-c;fu=a*u[0]+b*u[1]-c
        if fv<=0:out.append(v)
        if (fv<0)!=(fu<0):
            t=fv/(fv-fu);out.append((v[0]+t*(u[0]-v[0]),v[1]+t*(u[1]-v[1])))
    return out
seeds=[(x+random.uniform(-25,25),y+random.uniform(-22,22)) for y in range(-10,910,65) for x in range(-20,450,62)]
palette=['#d3dfd3','#c5d8c7','#dbe4d9','#b4cdb9','#cadac9','#e1e7dd','#bcd2bd']
for sx,sy in seeds:
    p=[(0,0),(W,0),(W,H),(0,H)]
    for tx,ty in seeds:
        if (sx,sy)==(tx,ty):continue
        p=clip(p,2*(tx-sx),2*(ty-sy),tx*tx+ty*ty-sx*sx-sy*sy)
        if not p:break
    if p:
        poly(p,random.choice(palette));stroke(p+[p[0]],'#e9efe5',.7)
# Park, with nested contours evocative of terrain.
park=[(65,212),(110,178),(162,185),(184,226),(212,275),(205,328),(233,362),(204,405),(163,400),(117,349),(89,297)]
poly(park,'#8fb49a')
for sc in [.88,.73,.58,.43]:
    pp=[(148+(x-148)*sc,291+(y-291)*sc) for x,y in park]
    stroke(pp+[pp[0]],'#a8c7ad',1)
# Small street grid around the park.
for x in range(-100,501,25):
    pts=[(x+18*math.sin(y/100),y) for y in range(-20,660,18)]
    stroke(pts,'#edf1e9',1.4)
for y in range(10,661,24):
    stroke([(-10,y),(100,y+12),(220,y+1),(400,y+30)],'#edf1e9',1.3)
# River and its banks, sweeping across the lower map.
river=[(-50,415),(25,429),(88,452),(152,477),(206,501),(271,510),(341,493),(420,468)]
stroke(river,'#c1d7d2',90);stroke(river,'#a9c7c2',77)
# Arterial roads and bridges.
roads=[([(-15,148),(69,161),(148,148),(230,158),(400,196)],5),
       ([(300,-10),(282,90),(266,188),(270,288),(244,370),(226,452),(219,555),(195,660)],7),
       ([(-10,355),(62,363),(121,391),(191,407),(267,406),(400,352)],5),
       ([(42,-10),(70,91),(58,180),(51,280),(65,375),(98,481),(129,595),(136,675)],6)]
for pts,size in roads:
    stroke(pts,'#b5c3b7',size+3);stroke(pts,'#fafbf7',size)
for pts in [[(101,220),(130,237),(158,264),(173,295),(169,332),(186,365)],[(80,303),(107,282),(130,284),(164,306),(191,314)]]:
    stroke(pts,'#dee8cd',2)
svg.append('</svg>')
out=Path(__file__).parent
(out/'map-background.svg').write_text(''.join(svg))
def chunk(t,d):return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
raw=b''.join(b'\0'+pix[y*w*3:(y+1)*w*3] for y in range(h))
png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',w,h,8,2,0,0,0))+chunk(b'IDAT',zlib.compress(raw))+chunk(b'IEND',b'')
(out/'map-background.png').write_bytes(png)
print(f'Created {w}×{h} map, {len(png)} bytes')

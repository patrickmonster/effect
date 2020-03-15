class Effect{
  constructor(target){
    this.ef=0;
    this.ele=[];//오브젝트들
    this.bord=document.querySelector(target);
    this.ctx=this.bord.getContext("2d");
    let t=this;
    if(this.bord.onresize){
      let tmp = this.bord.onresize;
      this.bord.onresize=()=>{tmp();t.resize()};
    }else this.bord.onresize=t.resize;
    cancelAnimationFrame(this.ef);
    this.resize();//초기 셋팅
    this.createEle();
    console.log(this.bord.style);
    //console.log(this.getPosition());
    this.render(this);
  }
  getPosition(){
    return this.bord.getBoundingClientRect()
  };
  createEle(){
    this.ele=[]
    for (let i = 0; i < 200; ++i) {
        this.ele.push({
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            s: Math.random() * 2 + 1
        });
    }
  }
  resize(){//크기조절
    let ele=this.getPosition();
    this.width=ele.width;
    this.height=ele.height;
  }
  update(l){//업데이트
    const grad = this.ctx.createLinearGradient(l.x, l.y, l.x, l.y + 200);
    const a = 1 - (this.height - l.y) / this.height * 0.8;
    grad.addColorStop(0, "hsla(340,100%,100%,.5)");
    grad.addColorStop(1, "hsla(340,100%,50%,0)");
    this.ctx.strokeStyle = grad;
    this.ctx.beginPath();
    this.ctx.moveTo(l.x, l.y);
    this.ctx.lineTo(l.x, l.y + 200);
    this.ctx.stroke();
    l.y -= l.s;
    if (l.y < -200) {
        l.y = this.height;
    }
  }
  render(con){
    con.ctx.clearRect(0,0,this.width,this.height)
    // console.log(this);
    for (let l of this.ele){
      con.update(l);
    }
    // console.log(this.ele);
    con.ef = requestAnimationFrame(()=>con.render(con));
  }
}

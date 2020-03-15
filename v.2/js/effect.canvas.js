class Effect{
  constructor(target){
    this.ef=0;
    this.ele=[];//오브젝트들
    this.bord=document.querySelector(target);
    this.ctx=this.bord.getContext("2d");
    this.tail=10;

    let t=this;
    if(this.bord.onresize){
      let tmp = this.bord.onresize;
      this.bord.onresize=()=>{tmp();t.resize()};
    }else this.bord.onresize=t.resize;
    cancelAnimationFrame(this.ef);



    this.resize();//초기 셋팅
    this.createEle();
    this.render(this);
  }
  getPosition(){
    return {width:window.innerWidth,height:window.innerHeight}
    // return this.bord.getBoundingClientRect()
  };
  createEle(){
    this.ele=[]
    for (let i = 0; i < 200; ++i) {
        this.ele.push({
            x: Math.random()*this.width,
            y:0,
            s: (Math.random()*5)+10
        });
    }
  }
  resize(){//크기조절
    let ele=this.getPosition();
    this.width=ele.width;
    this.height=ele.height;
  }
  update(l){//업데이트
    const grad = this.ctx.createLinearGradient(l.x, l.y, l.x, l.y + this.tail);
    const a = 1 - (this.height - l.y) / this.height * 0.8;
    grad.addColorStop(0, "hsla(340,100%,50%,"+a+")");
    grad.addColorStop(1, "hsla(340,100%,100%,1)");
    this.ctx.strokeStyle = grad;
    this.ctx.beginPath();
    this.ctx.moveTo(l.x, l.y);
    this.ctx.lineTo(l.x, l.y + this.tail);
    this.ctx.stroke();
    l.y += l.s;
    if (l.y > this.height) {
        l.y = -this.tail;
    }
  }
  render(con){
    con.ctx.clearRect(0,0,this.width,this.height)
    for (let l of this.ele){
      con.update(l);
    }
    con.ef = requestAnimationFrame(()=>con.render(con));
  }
}

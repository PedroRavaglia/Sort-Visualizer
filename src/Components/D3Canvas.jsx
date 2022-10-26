import { useRef, useEffect } from 'react'
import * as d3 from "d3"
import { colors } from "../App";

export default function D3Canvas({ state, canvas }) {
    const d3Svg = useRef();

    useEffect(() => {
        const svg = d3.select(d3Svg.current)
                      .attr('width', canvas.w)
                      .attr('height', canvas.h)
                      .attr("id", 'svg');
    
        const rects = svg.selectAll('rect')
                         .data(state.values)
                         .enter()
                         .append('rect')
                         .attr('x', (d, i) => canvas.padding_w + i * (canvas.r_w + canvas.r_s))
                         .attr('y', d => canvas.max_h - canvas.y(d) + canvas.padding_h)
                         .attr('width', canvas.r_w)
                         .attr('height', d => canvas.y(d))
                         .attr('stroke', 'black')
                         .attr('fill', colors.rec)
                         .attr("id", d => `rect-${d}`);
    
        return () => {
          rects.remove();
        }
      }, [state.n, state.values, canvas]);

    return <svg ref={ d3Svg }></svg>;
}
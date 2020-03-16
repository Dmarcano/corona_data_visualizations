

const lineStyle = {

    line: {

    },

    overlay : {

    },

    dot : {
        fill: '#ffab00',
        stroke: '#fff'
    }, 

    focus_circle : {
        fill : 'none',
        stroke : 'steelblue'
    }

}


function getMinX(data) {
    return data[0].x;
}
function getMaxX(data) {
    return data[data.length - 1].x;
}
// GET MAX & MIN Y
function getMinY(data) {
    return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);
}
function getMaxY(data) {
    return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
}


function getSvgX(x, svgWidth) {
    return (x / this.getMaxX() * svgWidth);
}

function getSvgY(y, svgHeight) {
    return svgHeight - (y / this.getMaxY() * svgHeight);
}

export default function LineChart(props)
{


    data = props.data


    return (
        <div>
            <svg>

            </svg>
        </div>
    );

}


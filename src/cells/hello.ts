// -------------------------DICTIONARIES / GLOBALS ------------------------- //
const possibleDirections: Array<number>[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

// -------------------------FUNCTIONS------------------------- //
function shuffle(array: any[]): void {
  array.sort(() => Math.random() - 0.5);
}
// Crypto module (node.js) is a better (more random) random function
function random(min: number, max: number): number {
  if (min === 0 && max === 0) return 0
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clamp(value: number, min=0, max=255): number {
  if (value < min) return min;
  else if (value > max) return max;
  return value;
}

function validColor(color: number[]): [number, number, number] {
  let [r, g, b] = color;
  return [clamp(r), clamp(g), clamp(b)];
}

function similarColor(color: number[], variation: number): [number, number, number] {
  let [r, g, b] = color;

  r += random(-variation, variation);
  g += random(-variation, variation);
  b += random(-variation, variation);

  return validColor([r, g, b]);
}

/**
 * Contains all Cells and handles them
 */
class CellWorld {

  width: number;
  height: number;
  grid: any[];
  cells: Cell[];
  hierarchy: any;
  drawDepth: number;
  finishedDrawing: boolean;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.grid = Array(height).fill(null).map(() => Array(width).fill(null));
    this.cells = [];
    this.hierarchy = {};
    this.drawDepth = 0;
    this.finishedDrawing = false;
  }

  /**
   * Call an update on each Cell Tree
   */
  updateCells(): void {
    const blockedCells: Cell[] = [];
    const cleanUp = (cell: Cell): void => {
      blockedCells.push(cell);
    };
    for (const cell of this.cells) cell.update(cleanUp); 
    this.cells = this.cells.filter(cell => !blockedCells.includes(cell));
  }

  /**
   * Draws cells in order
   */
  drawCells(): void {
    if (this.hierarchy[this.drawDepth]) {
      this.hierarchy[this.drawDepth].forEach((cell: Cell) => {
        cell.draw();
      })
    } else {
      console.log('Completed with a depth of', this.drawDepth);
      this.finishedDrawing = true;
    }
    this.drawDepth++;
  }

  /**
   * Determine if there is an open space at the given position
   */
   isOpenSpace(position: [number, number], modifier:(null | [number, number])=null): boolean {
    // Make a copy of position so that the original position data is untouched
    const testPosition = [...position]
    // Modify position check
    if (modifier) {
      testPosition[0] += modifier[0];
      testPosition[1] += modifier[1];
    }
    // Boundary check
    if (testPosition[0] < 0 || testPosition[0] > this.width - 1) return false;  // X
    if (testPosition[1] < 0 || testPosition[1] > this.height - 1) return false;  // Y
    // Collision check
    return this.grid[testPosition[1]][testPosition[0]] ? false : true;
  }

  /**
   * Updates the current position in space with the given value
   */
  updatePosition(position: [number, number], value: any): void {
    this.grid[position[1]][position[0]] = value;
  }
}

let cellWorld: CellWorld;

/**
 * A cell grows randomly in any open direction.
 */
class Cell {

  color: [number, number, number];
  position: [number, number];
  children: Cell[];
  depth: number;

  constructor(position: [number, number], color: [number, number, number], depth: number) {
    this.position = position;
    this.color = color;
    this.children = [];
    this.depth = depth;

    // Add myself to cellWorld.
    cellWorld.cells.push(this);
    cellWorld.updatePosition(this.position, true);
    if (cellWorld.hierarchy[depth]) cellWorld.hierarchy[depth].push(this);
    else cellWorld.hierarchy[depth] = [this];

    // Draw
    // this.draw();
  }

  update(cleanUp: (cell: Cell) => void ): Cell | void {
    shuffle(possibleDirections);
    for (const [dx, dy] of possibleDirections) {
      const [x, y] = this.position
      const position: [number, number] = [x + dx, y + dy]
      if (cellWorld.isOpenSpace(position)) {
        return this.createCell([dx, dy]);
      }
    }
    cleanUp(this as Cell);
  }

  /**
   * Create and return a new Cell object
   */
  createCell(direction: [number, number]): Cell {
    const newCell = new Cell([this.position[0] + direction[0], this.position[1] + direction[1]], similarColor(this.color, 1), this.depth + 1);
    this.children.push(newCell);
    return newCell;
  }

  /**
   * Draws Cell to canvas
   */
  draw() {
    while (!c) {} // TypeScript lint resolver
    c.fillStyle = `rgb(${this.color[0]}, ${this.color[1]}, ${this.color[2]})`;
    c.fillRect(this.position[0] * 1, this.position[1] * 1, 1, 1);
  }
}

// Loop functions
let generated: boolean = false;
const animate = () => {
  console.log(cellWorld.cells.length);
  if (cellWorld.cells.length) {
    cellWorld.updateCells();
  } else if (!generated) {
    generated = true;
    const ethanElement = document.querySelector('#ethan');
    const helloElement = document.querySelector('#hello');
    if (ethanElement && helloElement) {
      ethanElement.className += ' ethan-dark';
      helloElement.className += ' hello-dark';
    }
  }
  else if (!cellWorld.finishedDrawing) cellWorld.drawCells();
  else return;
  requestAnimationFrame(animate);
}

let c: CanvasRenderingContext2D | null;

// Initialize
const start = () => {
  // Canvas setup
  const canvas = document.querySelector('#hello-canvas') as HTMLCanvasElement;
  if (!canvas) console.log('No canvas found');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  c = canvas.getContext('2d', { alpha: false });
  while (!c) {} // TypeScript lint resolver

  // Fill background color
  c.fillStyle = '#111';
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);

  // Start Loops
  cellWorld = new CellWorld(window.innerWidth, window.innerHeight);
  // new Cell([Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2)], [0, 64, 128], 0);
  new Cell([Math.floor(window.innerWidth/2), Math.floor(window.innerHeight/2)], [200, 200, 200], 0);
  console.log('Cell World Size: ' + cellWorld.width + ', ' + cellWorld.height);
  console.log('Starting Hello Cells');
  animate();
}

export default start;

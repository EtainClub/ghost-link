/**
 * The things on the bench that an operator can actually touch.
 *
 * Position lives in page state rather than in the scene so that both the main
 * viewport and the picture-in-picture feed show the same bench, and so the HUD
 * can report what is currently gripped.
 */
export type VRObject = {
    id: string;
    label: string;
    /** Shown in the HUD target readout — the operator is told what they are holding. */
    mass: string;
    material: string;
    note: string;
    shape: 'box' | 'cylinder';
    /** box: [w, h, d] · cylinder: [rTop, rBottom, h] */
    args: [number, number, number];
    color: string;
    /** Local to the workstation group. y is the resting height on the desk. */
    pos: [number, number, number];
};

export type TaskId = 'soldering' | 'domestic';

/** Desk surface sits at y = 0.85 in workstation-local space. */
export const DESK_Y = 0.85;
/** How far an object lifts when gripped. */
export const GRIP_LIFT = 0.18;
/** Desk is 4 × 2; keep objects on it. */
export const DESK_BOUNDS = { x: 1.8, z: 0.9 };

const objectsByTask: Record<TaskId, VRObject[]> = {
    soldering: [
        {
            id: 'MCU-4',
            label: 'Microcontroller MCU-4',
            mass: '1.2 g',
            material: 'Ceramic / gold leads',
            note: 'Leads bend below 2 N. Seat it, do not press it.',
            shape: 'box',
            args: [0.1, 0.04, 0.1],
            color: '#1e293b',
            pos: [0, DESK_Y + 0.02, 0],
        },
        {
            id: 'CAP-B7',
            label: 'Capacitor bank B7',
            mass: '3.8 g',
            material: 'Aluminium can',
            note: 'Polarity marked on the short edge.',
            shape: 'box',
            args: [0.05, 0.06, 0.15],
            color: '#0f172a',
            pos: [0.15, DESK_Y + 0.03, -0.1],
        },
        {
            id: 'BRACKET-492X',
            label: 'Bracket 492-X',
            mass: '210 g',
            material: 'Titanium, satellite grade',
            note: 'The objective. Cracks at 0.4 N over nominal grip.',
            shape: 'box',
            args: [0.22, 0.05, 0.09],
            color: '#94a3b8',
            pos: [-0.45, DESK_Y + 0.025, 0.18],
        },
    ],
    domestic: [
        {
            id: 'PLATE-01',
            label: 'Dinner plate',
            mass: '340 g',
            material: 'Glazed stoneware',
            note: 'Someone ate off this an hour ago.',
            shape: 'cylinder',
            args: [0.15, 0.1, 0.05],
            color: '#ffedd5',
            pos: [-0.2, DESK_Y + 0.025, 0.1],
        },
        {
            id: 'CUP-03',
            label: 'Glass tumbler',
            mass: '190 g',
            material: 'Soda-lime glass',
            note: 'Wet. Grip reports 40% less friction.',
            shape: 'cylinder',
            args: [0.06, 0.05, 0.15],
            color: '#3b82f6',
            pos: [0.3, DESK_Y + 0.075, -0.2],
        },
        {
            id: 'SPOON-11',
            label: 'Teaspoon',
            mass: '32 g',
            material: 'Stainless steel',
            note: 'Small enough that the local model refuses to try.',
            shape: 'box',
            args: [0.03, 0.015, 0.16],
            color: '#cbd5e1',
            pos: [0.05, DESK_Y + 0.008, 0.28],
        },
    ],
};

export function objectsFor(task: TaskId): VRObject[] {
    // Fresh copies so dragging one task's objects never mutates the template.
    return objectsByTask[task].map(o => ({ ...o, pos: [...o.pos] as [number, number, number] }));
}

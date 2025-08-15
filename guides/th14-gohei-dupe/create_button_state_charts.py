import matplotlib.pyplot as plt
import numpy as np
import os
from matplotlib.patches import Rectangle

def generate_button_state(num_frames, hold_ranges):
    """
    Generates an array of button states (0 or 1) over num_frames.
    
    Parameters:
    - num_frames: total number of frames
    - hold_ranges: list of (start, end) tuples for when the button is held
                   inclusive start, exclusive end
    
    Example:
    generate_button_state(10, [(2, 5), (7, 9)])
    -> [0 0 1 1 1 0 0 1 1 0]
    """
    button_state = np.zeros(num_frames, dtype=int)
    for start, end in hold_ranges:
        button_state[start:end] = 1
    return button_state

def draw_striped_pattern(x_start, x_end, clr):
    stripe_rect = Rectangle(
        (x_start, -0.2),
        x_end - x_start,
        1.4,
        facecolor='none',
        hatch='////',
        edgecolor=clr,
        linewidth=0
    )
    Params.ax.add_patch(stripe_rect)

def draw_horizontal_bracket(ax, x0, x1, y_offset=0.05, height=0.1, text=None, position='top', 
                             color='white', lw=2, text_offset=0.02):
    """
    Draws a horizontal bracket (rotated [ and ]) from x0 to x1 above/below the plot area.
    
    x0, x1: in data coordinates (time/frames)
    y_offset: offset from top/bottom of plot in axes coords (0=bottom, 1=top)
    height: bracket height in axes coords
    position: 'top' or 'bottom'
    """

    # Set vertical positioning in axes coords
    if position == 'top':
        base_y = 1 + y_offset
        h = height
        va_text = 'bottom'
    else:
        base_y = -y_offset
        h = -height
        va_text = 'top'

    transform = ax.get_xaxis_transform()  # x in data, y in axes coords

    # Draw bracket lines (clip_on=False lets them go outside the axes)
    ax.plot([x0, x0], [base_y, base_y + h], transform=transform, color=color, lw=lw, clip_on=False)
    ax.plot([x0, x1], [base_y + h, base_y + h], transform=transform, color=color, lw=lw, clip_on=False)
    ax.plot([x1, x1], [base_y, base_y + h], transform=transform, color=color, lw=lw, clip_on=False)

    # Optional text
    if text:
        ax.text((x0 + x1) / 2, base_y + h + (text_offset if position == 'top' else -text_offset),
                text, ha='center', va=va_text, color=color, transform=transform, clip_on=False)

def draw_annotation(ax, x, text, y_offset=0.05, text_offset=(2, 0.1), 
                    position='top', arrow_color='orange', text_color='white'):
    """
    Draws an annotation with an arrow pointing from outside the plot to (x, y in data).
    
    x: x position in data coordinates
    text: annotation label
    y_offset: how far outside the plot (in axes coords)
    text_offset: tuple (dx, dy) in data units (for horizontal) and axes units (for vertical)
    position: 'top' or 'bottom'
    """
    # Choose vertical base position
    if position == 'top':
        base_y = 1 + y_offset
        va = 'bottom'
    else:
        base_y = -y_offset
        va = 'top'

    # Text location
    text_x = x + text_offset[0]
    text_y = base_y + (text_offset[1] if position == 'top' else -text_offset[1])

    # Draw annotation
    ax.annotate(
        text,
        xy=(x, base_y), xycoords=('data', 'axes fraction'),
        xytext=(text_x, text_y), textcoords=('data', 'axes fraction'),
        arrowprops=dict(arrowstyle="->", color=arrow_color, clip_on=False),
        color=text_color,
        ha='left', va=va,
        clip_on=False
    )

class Params:
    fig = None
    ax = None
    max_x_length = None
    clr_line = None
    clr_fill = None
    clr_annotation = None
    state_list = None
    file_name = None
    
def shared_settings_header():
    Params.fig, Params.ax = plt.subplots(figsize=(10, 2.5), dpi=150)
    # Settings shared across all charts
    Params.ax.set_ylim(0.0, 1.1)
    Params.ax.set_yticks([0, 1])
    Params.ax.set_yticklabels(['Not Pressed', 'Pressed'])
    Params.ax.grid(color='gray', linestyle='--', alpha=0.3)
    Params.ax.set_xlabel('Time (frames)', color='white')

def shared_settings_footer():
    frames = np.arange(0, Params.max_x_length)
    button_state = generate_button_state(Params.max_x_length, Params.state_list)
    Params.ax.plot(frames, button_state, color=Params.clr_line, linewidth=1.5)
    Params.ax.set_xlim(0, Params.max_x_length-1)
    Params.ax.fill_between(frames, button_state, color=Params.clr_fill, alpha=0.3)
    plt.tight_layout()
    script_dir = os.path.dirname(os.path.abspath(__file__))
    save_path = os.path.join(script_dir, Params.file_name)
    plt.savefig(save_path, facecolor=Params.fig.get_facecolor())
    plt.close()
    print("Chart saved as", Params.file_name)

def create_chart_dash():
    shared_settings_header()
    Params.max_x_length = 61
    Params.clr_line = 'deepskyblue'
    Params.clr_fill = 'cyan'
    Params.clr_annotation = 'white'
    Params.state_list = [(0, 14), (30, Params.max_x_length)]
    Params.file_name = "button_state_chart_dash.png"
    draw_annotation(Params.ax, 15+12, "Goheis despawn", y_offset=-0.1, text_offset=(1.5, 0.20), position='top', text_color='orange')
    draw_striped_pattern(15, 15+12, 'orange')
    draw_horizontal_bracket(Params.ax, 15, 15+12, y_offset=0.05, height=0.05, lw=1, text="Despawn timer\n(12 frames)", position='top', color='orange')
    Params.ax.set_ylabel('Button State\n(Shift) ', color='white')
    shared_settings_footer()

def create_chart_few_amulets():
    shared_settings_header()
    Params.max_x_length = 61
    Params.clr_line = 'deepskyblue'
    Params.clr_fill = 'cyan'
    Params.clr_annotation = 'white'
    Params.state_list = [(0, 4), (5, 20), (22, 26), (30, 39), (43, 50), (55, Params.max_x_length)]
    Params.file_name = "button_state_chart_few_amulets.png"
    Params.ax.set_ylabel('Button State\n(Shift) ', color='white')
    shared_settings_footer()
    
def create_chart_many_amulets():
    shared_settings_header()
    Params.max_x_length = 61
    Params.clr_line = 'deepskyblue'
    Params.clr_fill = 'cyan'
    Params.clr_annotation = 'white'
    Params.state_list = [(0, 4), (10, 12), (22, 23), (30, 33), (43, 45), (55, Params.max_x_length)]
    Params.file_name = "button_state_chart_many_amulets.png"
    Params.ax.set_ylabel('Button State\n(Shift) ', color='white')
    shared_settings_footer()
    
def create_chart_retry_time_n2():
    shared_settings_header()
    Params.max_x_length = 91
    Params.clr_line = 'mediumorchid'
    Params.clr_fill = 'plum'
    Params.clr_annotation = 'white'
    Params.state_list = [(4, 5), (7, 9), (10, 50), (65, 67), (68, 69), (71, Params.max_x_length)]
    Params.file_name = "button_state_chart_retry_time_n2.png"
    Params.ax.set_ylabel('Button State\n(Shift + Z) ', color='white')
    draw_striped_pattern(50, 50+12, 'orange')
    draw_horizontal_bracket(Params.ax, 4, 10, y_offset=0.05, height=0.05, lw=1, text="Gohei duping \\#1\n(triple tap method)", position='top', color='white')
    draw_horizontal_bracket(Params.ax, 12, 63, y_offset=0.05, height=0.05, lw=1, text="Gohei retry time", position='top', color='white')
    draw_horizontal_bracket(Params.ax, 64, 70, y_offset=0.05, height=0.05, lw=1, text="Gohei duping \\#2", position='top', color='white')
    
    shared_settings_footer()
    
def create_chart_retry_time_n6():
    # reset time + despawn: 41 + (15 + 5), n = 6
    shared_settings_header()
    Params.max_x_length = 361
    Params.clr_line = 'mediumorchid'
    Params.clr_fill = 'plum'
    Params.clr_annotation = 'white'
    Params.state_list = [
        (4, 5), (7, 9), (10, 51),
        (71, 72), (75, 77), (79, 120),
        (141, 144), (146, 147), (149, 190),
        (208, 211), (214, 216), (217, 259),
        (279, 280), (282, 284), (286, 327),
        (348, 350), (351, 352), (356, Params.max_x_length),
    ]
    Params.file_name = "button_state_chart_retry_time_n6.png"
    Params.ax.set_ylabel('Button State\n(Shift + Z) ', color='white')
    draw_striped_pattern(51, 51+12, 'orange')
    draw_horizontal_bracket(Params.ax, 11, 70, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(59 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 80, 140, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(60 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 150, 207, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(57 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 218, 278, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(60 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 287, 347, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(60 frames)", position='top', color=Params.clr_annotation)

    shared_settings_footer()
    
def create_chart_retry_time_n9():
    # reset time + despawn: 16 + 15, n = 9
    shared_settings_header()
    Params.max_x_length = 361
    Params.clr_line = 'mediumorchid'
    Params.clr_fill = 'plum'
    Params.clr_annotation = 'white'
    Params.state_list = [
        (4, 5), (7, 9), (10, 28),
        (43, 44), (46, 48), (50, 69),
        (83, 85), (87, 88), (90, 108),
        (123, 126), (127, 129), (131, 150),
        (165, 167), (169, 170), (172, 191),
        (207, 209), (211, 212), (216, 234),
        (251, 254), (255, 257), (258, 275),
        (291, 293), (294, 297), (299, 315),
        (331, 332), (335, 337), (338, Params.max_x_length),
    ]
    Params.file_name = "button_state_chart_retry_time_n9.png"
    Params.ax.set_ylabel('Button State\n(Shift + Z) ', color='white')
    draw_striped_pattern(28, 28+12, 'orange')
    draw_horizontal_bracket(Params.ax, 11, 42, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(31 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 51, 82, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(31 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 91, 122, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(32 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 132, 164, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(32 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 173, 206, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(33 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 217, 250, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(33 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 259, 290, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(31 frames)", position='top', color=Params.clr_annotation)
    draw_horizontal_bracket(Params.ax, 300, 330, y_offset=0.05, height=0.05, lw=1, text="Retry time\n(30 frames)", position='top', color=Params.clr_annotation)

    shared_settings_footer()
    

def create_chart_youre_taking_too_short():
    shared_settings_header()
    Params.max_x_length = 91
    Params.clr_line = 'mediumorchid'
    Params.clr_fill = 'plum'
    Params.clr_annotation = 'white'
    Params.state_list = [(4, 5), (7, 9), (10, 50), (61, 63), (65, 67), (69, Params.max_x_length)]
    Params.file_name = "button_state_chart_youre_taking_too_short.png"
    Params.ax.set_ylabel('Button State\n(Shift + Z) ', color='white')
    draw_striped_pattern(50, 50+12, 'orange')
    # draw_horizontal_bracket(Params.ax, 4, 10, y_offset=0.05, height=0.05, lw=1, text="Gohei duping \\#1\n(triple tap method)", position='top', color='white')
    # draw_horizontal_bracket(Params.ax, 12, 63, y_offset=0.05, height=0.05, lw=1, text="Gohei retry time", position='top', color='white')
    # draw_horizontal_bracket(Params.ax, 64, 70, y_offset=0.05, height=0.05, lw=1, text="Gohei duping \\#2", position='top', color='white')
    draw_annotation(Params.ax, 61, "Goheis do not despawn", y_offset=-0.1, text_offset=(1.5, 0.20), position='top', text_color='white', arrow_color='white')
    draw_horizontal_bracket(Params.ax, 50, 50+12, y_offset=0.05, height=0.05, lw=1, text="Despawn timer\n(12 frames)", position='top', color='orange')

    shared_settings_footer()

plt.style.use('dark_background')
plt.rcParams.update({
    'text.usetex': True,
    'font.family': 'serif',
    'font.serif': 'Computer Modern',
    'font.size': 12
})

# create_chart_dash()
# create_chart_few_amulets()
# create_chart_many_amulets()
# create_chart_retry_time_n2()
# create_chart_retry_time_n6()
# create_chart_retry_time_n9()
create_chart_youre_taking_too_short()

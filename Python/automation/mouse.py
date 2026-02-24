#! python3

from pynput import keyboard
from pynput.mouse import Button, Controller


def multiple_click(mouse, btn=Button.left, times=1):
    print('click x', times)
    for i in range(times):
        mouse.click()
        

def on_press(key):
    try:
        print(key)
        if key == keyboard.Key.cmd:
            mouse = Controller()
            multiple_click(mouse, times=3)
    except:
        print('')


def on_release(key):
    pass


# Collect events until released
with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()


# # no-blocking fashion:
# listener = keyboard.Listener(on_press=on_press, on_release=on_release)
# listener.start()

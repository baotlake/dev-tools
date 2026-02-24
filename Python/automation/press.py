#! python3

from pynput import keyboard
from pynput.keyboard import Controller, Key


def multiple_press(times=1):
    print('press x', times)
    keyboard = Controller()
    for i in range(times):
        with keyboard.pressed(Key.cmd):
            keyboard.press('p')
            keyboard.release('p')

def on_press(key):
    try:
        print(key)
        if key == keyboard.Key.space:
            multiple_press(3)
            pass
    except:
        print('')

def on_release(key):
    pass


with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()


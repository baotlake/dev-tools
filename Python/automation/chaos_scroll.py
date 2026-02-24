from pynput.mouse import Controller
from pynput import keyboard
import random
import time

count = 0

def start():
    mouse = Controller()

    global count

    print('count', count)

    while count > 1:
        count = count - 1
        time.sleep(0.03)

        dx = (random.random() - 0.5) * 100
        dy = (random.random() - 0.5) * 100

        print(dx, dy)
        mouse.scroll(dx, dy)

 
def on_press(key):
    try:
        if key == keyboard.Key.space:
            print('start')
            global count
            count = 30 * 5
            start()
    except:
        print('')


def on_release(key):
    pass


with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()

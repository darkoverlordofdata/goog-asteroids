python  /home/bruce/Applications/closure/library/closure/bin/build/closurebuilder.py \
    --root=/home/bruce/Applications/closure/library/ \
    --root=./packages/ash.coffee/goog/lib \
    --root=./goog/asteroids \
    --input=./goog/asteroids/start.js \
    --namespace=asteroids \
    --output_mode=compiled \
    --compiler_jar=/home/bruce/Applications/closure/compiler/compiler.jar \
    --compiler_flag="--compilation_level=ADVANCED_OPTIMIZATIONS" \
    --compiler_flag="--formatting=pretty_print" \
    --compiler_flag="--create_source_map=web/asteroids.js.map" \
    --compiler_flag="--warning_level=QUIET" \
    --compiler_flag="--language_in=ECMASCRIPT5" \
    > web/asteroids.min.js

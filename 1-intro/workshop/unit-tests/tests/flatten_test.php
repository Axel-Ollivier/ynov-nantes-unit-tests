<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function test_with_null()
    {
        $this->assertEquals([], flatten([]));
    }

    public function test_input_type(){
        $this->expectException(TypeError::class);
        flatten('1');
        $this->expectException(TypeError::class);
        flatten(1);
        $this->expectException(TypeError::class);
        flatten(true);
    }

    public function test_with_single_value()
    {
        $this->assertEquals([1], flatten([1]));
    }

    public function test_with_multiple_values()
    {
        $this->assertEquals([1, 2, 3], flatten([1, 2, 3]));
    }

    public function test_nested_once()
    {
        $this->assertEquals([1, 2, 3], flatten([1, [2, 3]]));
    }

    public function test_nested_multiple()
    {
        $this->assertEquals([1, 2, 3, 4, 5, 6, 7], flatten([[1, 2, 3], 4, [5, [6, 7]]]));
    }
}
